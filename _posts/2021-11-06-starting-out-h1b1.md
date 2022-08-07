---
layout: post
title: "Starting out as an H-1B1 holder"
---

In summary, this is my US immigration background

- I have never been to the US prior.
- I do not have any relatives in the US.
- I am a Singapore citizen, who is eligible for H-1B1. Unlike H-1B, no lottery process is needed to apply for a H-1B1.
- I am starting my role as a software engineer at Quora in November 2021.

Pieces of information here may be useful to you, however shortlived and incomplete.



## Getting a Job Offer

You need to get a job offer and accept the job offer first, before getting a visa.

I got a Quora interview from a public coding competition organised by Quora back in [February 2021](https://challenge.quora.com/).

The company would hire immigration lawyers to help the company's share of required paperwork. You also need to do your substantial share of paperwork. You should not be paying any administrative fees except to the US government.



## Obtaining an H-1B1

Ashley has written [a very comprehensive guide](https://ashleylim.medium.com/navigating-the-h1b1-visa-process-4c8e459c4b96) on the process of obtain an H-1B1

There are a few things from the article I want to highlight
- I paid my MRV application fee with SAM. However, I learnt that this option has since been [unavailable](https://www.ustraveldocs.com/sg/sg-niv-paymentinfo.asp).
- Schedule your interview appointment early. With Covid and all, the availability of the timeslot can be inconsistent. Once you are confirmed that you are accepting the offer, you can complete the DS-160 early and schedule an interview timeslot. The risk of rescheduling it early is that you might lose the deposit. I could reschedule the interview twice.
- The company can only start completing the visa application after you have obtained your degree scroll. Depending on the lawyer, a letter of conferment (stating that you have completed all your requirements and you will receive your degree scroll on a certain date) may be accepted. Regardless, you can submit your information and schedule your interview before you receive your degree scroll.
- According to an [FAQ entry](https://ustraveldocs.com/sg/sg-gen-faq.asp#qlistwork5), you may not enter the United States until 10 days prior to your employment start date.
- You may need to upload your entire passport. The passport could only be one file, preferably pdf. There is a file size limit for your passport. As a software engineer, these are the commands I use to downsize and bind my passport into a pdf file from png images. The inputs are png files for each scan in numerical order.

```bash
mkdir ../tmp
find . -maxdepth 1 -iname "*.png" | xargs -L1 -I{} convert -resize 40% "{}" ../tmp/"{}"
convert ../tmp/*.png passport.pdf
```



How to handle the interview session

- You will be handed a pamphlet regarding your rights, and one of the interview questions is to summarise the contents of the pamphlet. A summary like "I know my rights, I can refer to the pamphlet as well as online resources" should be sufficient.
- The interviewer also asked whether the salary displayed on the LCA was consistent with my offer letter, in which I have shown my offer letter.
- The other questions asked were about my school and degree, as well as what business is my company involved in.
- Short, concise and confident answers are preferred.
- You are recommended to wear smart casual to make yourself look and feel comfortable. For guys, T-shirt, long pants and covered shoes should be sufficient.



Your company lawyer would prepare an application package for you. Fragomen is my company immigration lawyer. For mine, it includes

- Form G-28, Notice of Appearance of Attorney
- Certified Form ETA-9035, Approved Labor Condition Application
- Employer support letter
- Copy of applicant's passport biographic page
- Evidence of applicant's educational qualifications (some evaluator saying that my degree is legitimate)
- Corporate documents (basically public information about Quora)
- Signed offer letter (not prepared but was requested during the interview)



This is my timeline regarding my H-1B1 visa

- Confirmation of offer (April)
- Scheduled an embassy interview date (August)
- Commencement to get graduation scroll (25 September)
- Labor Condition Application Certified (1 October)
- Hardcopy Visa application documents shipped (5 October)
- Hardcopy Visa application documents received (8 October)
- Embassy interview (13 October, 0915)
- Pickup passport with H1B1 visa (14 October)
- Preflight Covid ART Testing (30 October)
- Flight the US (2 November 1840)
- Commence job (8 November)



## Flight and Preflight Covid testing

I took Singapore Airlines direct flight from Changi Airport to San Francisco International Airport. My premium economy airfare was \$1109.30. I remember seeing options for a round trip at \$1300, but I did not bother with that.

You cannot do an online check-in on Singapore Airlines with the H-1B1 visa. Apparently, the option is for people who do not need a visa to travel to the US, or are on the [Visa Waiver Program](https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html). I needed to check in physically. This was not indicated in the user interface and gave me a small panic.

The premium economy seat allows for 2 bags of 23 kg each. I tried to check in 3 bags of 10 kg each and was rejected, but we did prepare for the scenario. 

As per [US Covid regulations](https://www.cdc.gov/coronavirus/2019-ncov/travelers/testing-international-air-travelers.html), I needed to take a Covid test. An ART test works for entry into the United States, and I paid $30 for the test. The results of the ART test is produced within less than half an hour. PCR tests are more expensive, and the results is usually only produced the next day. You are recommended to take a test that can print your passport number along with it. The Singapore Airlines website lists [some testing locations](https://www.singaporeair.com/en_UK/sg/travel-info/pdt-pcr-locations/).

You should [research](https://www.cbp.gov/travel/us-citizens/know-before-you-go/prohibited-and-restricted-items) on what you cannot bring to the US. Generally, you cannot bring in food except factory packaged food. After staying for a while, this is what I would have liked to bring into the US to use up my luggage allowance - curry powder and cereal mix (and other drinks). You can buy some of such Asian foods from Ranch 99, but at slightly inflated prices.

I only brought US$1000 into the US. I should have brought in more money to help with the initial deposit and expenses. The FX fees are worth paying to help you transition. You can estimate the FX fees by comparing the difference between the buy and sell value. The exchange in Bishan has a ratio is 2.2%, whereas exchanges in the airport have a ratio of more than 5%. If you use Transferwise, the fee is approximately 0.8% for transferring US$1000, but you will need a US bank account for that.



## Housing

My friend and I have sourced for the housing that I am currently staying.

I think Zillow is a good search engine for housing, as it scrapes real estate websites and indexes them on Zillow.

This is what you need to look out for in a house. The information posted on or scraped onto Zillow may be incorrect.

- Distance from office.
- Distance from amenities.
- Surroundings. Whether is there going to be noise pollution from construction or traffic, for example.
- How many beds and how many baths, as well as square feet and configuration. Usually, you will be sharing the apartment with your friend and you need to decide who takes which room and how to split the rent.
- Floors - carpeted or hardwood. Usually, the second floor and above are carpeted so that the sound does not travel downstairs. However, carpets are difficult to clean. Carpets are also a risk, as you are expected to return them to the original undamaged condition at the end of the lease. Some people are allergic to carpets too.
- Stove (expected) and whether it has a fume hood.
- Fridge (expected) and whether it has a water or ice dispenser.
- Dishwasher. This saved us a lot of time from washing plates.
- Utilities. Some rentals include water and garbage collection. Usually rental do not consider gas and electricity. Do consider this in the pricing.
- Furnishings. Usually, year-long rentals do not include furniture, except the ones listed above.

I strongly recommend you document the condition of the apartment before moving in and after moving out. In event of disputes, facts will help, especially as your security deposit is with the landlord. A video recording is an efficient way of documentation. If you have a suitable phone model, you can consider using poly.cam to make a [VR rendering](https://poly.cam/capture/B8E540F9-B2C1-4FEA-92B9-D4DA4B6F1A01) of your unit. Please note of these in particular 

- Carpet condition - whether are there damages and stains.
- Toilet condition - whether the toilet bowl is loose and does it flush well.
- Cupboard linings - whether the shelf liner is peeling off.

To sign a rental contract with the landlord, you need to place a security deposit and have a valid social security number with preferably some credit history. Some companies offer corporate housing for a few months for you to settle in before you rent a house on your own. I still manage to get a rental contract without credit history, however, I would need to pay double the deposit.

You may be required to get rental insurance. Even if it is not required, I do recommend getting rental insurance. My housing agent administer bills via an Appfolio which has Roost Renters Insurance as a default. It was worth it to go against the default and choose Lemonade which was around \$66 per year compared the \$360 per year that we would have paid with Roost for a similar coverage. See the last section for my Lemonade referral link.

I am not the main tenant signing the contract for my first and second locations. If you do not have any contacts here and your company does not offer corporate housing, you can first Airbnb for a temporary place of residence and then find a place to rent for the long term. Alternatively, you can see if anyone on [Craigslist](https://sfbay.craigslist.org/) or Facebook marketplace is looking for housemates.

I will write about the co-living arrangements and move-in procedures in a separate document.



## Bank account

You need a bank account to receive your payroll, and to make payments from. Many services do not accept international debit/credit cards - I had to use my friend's US credit card for ordering items from Walmart, AT&T or T-Mobile. The only service I managed to use an international debit card for is Uber.

My friend recommended me Chase Bank. You may ask someone to refer you so that they also get their referral bonus on your first payroll.

The only decision I have to make when opening an account is whether I want to open a savings account. There are restrictions on how often can you withdraw from a savings account (because it is meant for savings).

If you do not overdraft, the maximum fees incurred is probably \$12 per month from the checking account and \$5 per month from the savings account. I got charged the savings account fee once.

I had the following to open my bank account

- Original Passport
- A proof of residence - a rental agreement with your name, or your company HR confirming that you live in that address, or a utility bill.
  - Apparently, my housemates managed to use the J1 visa as proof of residence.
  - I drafted an email for HR to sign. I forwarded the email it to the banker.

```
(Company logo)

To whom it may concern

(name) (passport number) is an employee of (Company), working as (role) starting from (date). (pronoun) current location of residence is (address).

Yours faithfully
(Signoff)
```

I think you will get \$225 for signing up for a new account, in around week after your first paycheck. If you use my referral link (listed in the last section), I get $50 in addition (and you still get your signing bonus).

You do not need a social security number to open your account. However, to apply for a credit card, you need to have a social security number and you need to go down to the office to link your social security number to your account. You may want to apply and use your credit card to build a credit rating. A good credit rating makes approval for housing applications easier. See the last section for my credit card referral link.

Chase offers a [credit score check](https://www.chase.com/personal/credit-cards/free-credit-score), powered by Experian. For me, it appeared around half a month after I made my first payment on my credit card.

Generally, Chase has been fine. They do send me promotions that I need to opt out of. The biggest issue I have with the service is fraud reporting, which is [not 24/7](https://www.chase.com/digital/resources/privacy-security/security/report-fraud).

When you are first sending a large amount of cash to someone, you may trigger a fraud prevention measure and your account will be locked. You can resolve this my calling Chase (with phone number listed on the debit card) with the details you used to sign up your account with.



## Social Security Number

The I-9 Employment Eligibility Verification form requires a social security number.

I called the Redwood City social security office on 4 November 2021 for an appointment on 19 November 2021. My friend called the Mountain View social security office on 2 February 2022 for an appointment on 14 March 2022. It is recommended to call the office a considerable time before your flight so that you can schedule the appointment as soon as possible after you arrive in the US. You need to call the office yourself, as the call handler rejected my call when I tried to help my friend schedule his appointment.

I would need to bring
- my passport with the machine-readable H-1B1 visa
- I-94 downloaded from [a DHS website](https://i94.cbp.dhs.gov/I94/#/recent-search)
- A filled [SS-5 form](https://www.ssa.gov/forms/ss-5.pdf)

The social security card was delivered to my address in a week.

The social security card is printed on security paper. When detached, it looks like a name card. Therefore, be very careful when opening the envelope when it is delivered. Record down your social security number, and keep your social security card together with your passport.

There is a [procedure](https://www.ssa.gov/ssnvisa/) for you to apply for your Social Security Number when you apply for your immigrant visa, but I have not heard of anyone doing it.



## Phone Number and Mobile Data

A US phone number is a necessity because you need to accept 2FA notifications via SMS for many services.

My peers recommend Mint Mobile. The prices are much cheaper. However, Mint Mobile requires a [compatible phone](https://www.mintmobile.com/byop/). I should have bought an iPhone when I was in Singapore before moving to the US.

My phone was incompatible, so I have to settle with using ATT for my first few months. I bought a [3-month $99 prepaid plan](https://www.att.com/support/article/wireless/KM1391956/). I would have preferred to obtain a SIM card in store rather than shipping and waiting for it.

However, having experienced using both ATT and Mint Mobile, I can feel the difference in signal strength and coverage.

I have moved on to Mint Mobile after buying an iPhone. I can continue to receive 2FA for my Singapore number because my iPhone supports [dual SIM](https://support.apple.com/en-us/HT209044). However, I think I need to top up $6 every two months to keep the number.



## Driving

I do not have a driving license in Singapore. You need to know how to drive to get anywhere in the US.

Public transport is very rudimentary. Buses, trams and trains are infrequent, but usually on time. You can find the transport map and bike map online for [various](https://www.vta.org/go/maps) [regions](https://www.samtrans.com/schedulesandmaps/maps.html) of the Bay Area.

It is easier to learn how to drive in the US than in Singapore. To learn driving in California you first need to pass a California permit test. With the permit, you may drive in the presence of a fully licensed driver, who might a driving instructor. After passing the practical test at the DMV, you have the full license. The process in Singapore is more complicated.

If you already have a driving license from Singapore, I think you may be exempted from obtaining a license for a few months (citation needed).

You may want to get a second-hand car for a few thousand dollars. You need to buy car insurance as well, and there are some charges and sales tax involved in registering the transfer of ownership with the DMV.


I hope this will help.
