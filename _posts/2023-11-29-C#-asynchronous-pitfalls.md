## The Issue

- Arose during testing of hundreds of asset creations at once meaning lots of repository method calls.
- During debugging the code would break immediately after an exception was thrown in the repository layer method.
- The IDE would state the exception is being unhandled even though a try, catch wrapped the method calls.
- Cost me a few hours of debugging wondering why the IDE thought the exception was not caught.

**Can you see the issue in the code below?** _Irrelevant code omitted and indicated by ellipsis._

```c#
// Inside top level service layer method CreateAssetAsync
try
{
    ...
    FinaliseAssetCreation(asset...);
}
catch (RateLimitException ex)
{
    await _queueService.AddMessageToQueueAsync(deviceString, QueueTableNames.ProcessNewDevicesQueueName, ex.RetryAfter);
}
```

```c#
// FinaliseAssetCreation service layer method
private async void FinaliseAssetCreation(asset...)
{
    var createdAsset = await _freshServiceRepo.CreateAssetAsync(asset...);
    _logger.logInformation("Successful asset creation!");
    ...
}
```

```c#
// CreateAssetAsync repository layer method
public async Task<Asset> CreateAssetAsync(Asset asset)
{
    var response = await client.SendAsync(asset);
    var respContent = await response.Content.ReadAsStringAsync();

    if (!response.IsSuccessStatusCode)
    {
        if (response.StatusCode == HttpStatusCode.TooManyRequests)
        {
            throw new RateLimitException();
        }
        throw new FreshServiceException("CreateAssetError:" + respContent);
    }
    else // Errored here stating unhandled exception thrown inside the IF statement
    {
        var newAsset = JsonConvert.DeserializeObject<Asset>(respContent);
        return newAsset;
    }
}
```

## The Resolution

Luckily, a collegue spotted I had fallen into the `async void` pitfall and noticed I was making a synchronous call to an asynchronous
method.

I needed to return a Task so that the caller (`CreateAssetAsync`) knows when the async code has completed and the exceptions could be caught and handled in the try, catch.

First, I awaited the call to `FinaliseAssetCreation`:

```c#
// Inside top level service layer method CreateAssetAsync
try
{
    ...
    await FinaliseAssetCreation(asset...); // **asynchronous** call
}
catch (RateLimitException ex)
{
    await _queueService.AddMessageToQueueAsync(deviceString, QueueTableNames.ProcessNewDevicesQueueName, ex.RetryAfter);
}
```

Then I changed the return type of void to Task on the `FinaliseAssetCreation` method:

```c#
// async FinaliseAssetCreation service layer method
private async Task FinaliseAssetCreation(asset...)
{
    var createdAsset = await _freshServiceRepo.CreateAssetAsync(asset...);
    _logger.logInformation("Successful asset creation!");
    ...
}
```

## The Conclusion

The repository was throwing an exception, but since the method calling it was running syncronously it had already exited. Hence, the error message stating the exception was being unhandled even though there was a try catch around the method call.

I believe I fell into this trap as I did not expect to receive anything back from the `FinaliseAssetCreation` method, so I was happy setting the return as `void`. However, the Task return type was necessary to enable proper error handling and signal completion.

The IDE did not give me any warnings and allowed me to syncronously run a asynchronous method with a `void` return type. I should have clocked on at this point and realised that I should be awaiting any calls to an `async` method.

After reading some Microsoft [documentation](https://learn.microsoft.com/en-us/archive/msdn-magazine/2013/march/async-await-best-practices-in-asynchronous-programming) on the issue I formed the following conclusions:

1. You should (almost) always avoid `async void` and instead return a `Task` so the caller knows when the code completes and exceptions can be handled.

2. The `async void` is allowed to make asynchronous event handler methods. These event handlers will want to return a `void` as the caller of these methods may not expect or recognise a type returned.

3. Think carefully about what code actually needs to run asynchronously, typically this should be any I/O requests to databases, file systems or APIs via the internet. Expensive CPU-bound calculations should also run asyncronously as these could require extended execution periods.

On the whole, I believe `async` code is great when it's done right. It allows multiple tasks to execute concurrently and it can greatly speed up execution if you have these tasks running in parallel without blocking threads. Although, there are some very easy pitfalls and it's good to keep them in mind to ensure your code is thread safe and actually running asynchronously.

### What did ChatGPT think?

Here is ChatGPT's response to my prompt asking if the `async void` method above was good code:

_Asynchronous Void Method: Using async void is generally discouraged for methods other than event handlers because it can make error handling more challenging. It's better to use async Task instead of async void so that you can await the method and handle exceptions._

This shows the potential of ChatGPT and AI as a tool as it managed to pick up on something that I, as the developer, missed during implementation. I am not sure how powerful GitHub Co-Pilot is at the moment, but if it's any similar I would have expected it to flag this as a concern and save me a few hours debugging the issue described above.
