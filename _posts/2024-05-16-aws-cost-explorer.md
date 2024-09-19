---
layout: post
title: "Why you are not seeing usage in your AWS Cost Explorer ?"
categories: AWS
---

If you're using AWS credits to cover your costs but are confused why you're not seeing any charges in the AWS Cost Explorer,
you're not alone. The default Cost Explorer view can be misleading when credits are being applied to your account. Here's what's
going on and how to see your true usage costs.

### Credits Hide Your Actual AWS Usage Costs

By default, the AWS Cost Explorer only shows your out-of-pocket costs after credits have been deducted. So if credits are
covering all or most of your AWS charges, Cost Explorer will show $0 or very low costs, even if you're using a lot of billable
services. This can make it seem like you're not incurring any real costs, but that's not the case. The credits are just
temporarily hiding your actual usage. Once the credits run out, you'll be on the hook for the full bill.

### How to See Costs Before Credits in Cost Explorer

To uncover your true usage costs that the credits are covering, you need to change the "Cost Explorer" settings:

1. In Cost Explorer, look for the "Charge Type" filter on the right.
2. Change "Charge Type" to "Exclude" instead of "Include". 
3. Check the box for "Credits" under "Exclude". 
4. Apply the filter.

Now Cost Explorer will show your usage costs before any credits were applied. This gives you visibility into your real spend,
even if credits are currently covering it.

Honestly, the default view in Cost Explorer is not very intuitive when using credits. AWS should really make this more obvious
or allow you to set your preferred view. Having the credit-adjusted costs as the default hides your actual usage and lulls you
into a false sense that you're not incurring real costs. It's only when your credits run out and you get a surprisingly large bill
that you realize those resources weren't actually free. The "Charge Type" exclude filter is obscurely buried and many users don't
even know it exists. AWS should make this more prominent, especially for accounts using credits, so people can get an accurate view
of their spend. The current design seems to encourage credit users to underestimate their usage.
