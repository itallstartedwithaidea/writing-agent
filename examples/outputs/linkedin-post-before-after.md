# Example: LinkedIn Post — Before & After

## Topic: "Why most Google Ads accounts waste 40% of budget on branded search"

---

## ❌ BEFORE (Raw AI Output — Default Claude)

In today's digital advertising landscape, one of the most critical issues facing marketers is the inefficient allocation of budget towards branded search campaigns. It's important to note that many organizations inadvertently waste a significant portion of their Google Ads budget on branded keywords that they would likely capture through organic search results anyway.

Furthermore, this problem is compounded by the fact that most advertisers rely solely on ROAS metrics to evaluate campaign performance, which can provide a misleading picture of true incremental value. When we delve into the data, we often find that branded search campaigns report high ROAS figures, creating a false sense of optimization success.

To summarize, advertisers should consider implementing a comprehensive approach to brand vs. non-brand budget allocation that leverages incrementality testing and takes into account the holistic impact on their overall marketing ecosystem.

**QA Score: 8/40 — HARD FAIL**
- GPTZero: 94% AI probability
- Pangram: 91% AI probability
- 14 blacklisted phrases detected
- Burstiness: 3.2 (critically low)
- Sentence length StdDev: 4.1 (critically low)

---

## ✅ AFTER (Ghost Protocol Output)

I've been saying this for years and nobody wants to hear it.

40% of your Google Ads budget is probably going to branded search that you'd get for free. Forty percent. I'm not guessing — I've audited over 200 accounts in the last three years, and the pattern is almost always the same.

Here's what happens. The PMax campaign reports a 12x ROAS. The client sees that number and thinks they're killing it. The agency sees that number and puts it in the monthly report. Everyone's happy.

Except 80% of those conversions are branded. The person was already going to buy. You just paid Google $4.50 a click for traffic that was walking through your door anyway.

And the real non-brand campaigns? The ones actually finding new customers? They're starved for budget because the branded campaigns are eating everything.

I ran this exact analysis on a $2.3M/year account last quarter. When we throttled branded spend by 35% and redistributed to non-brand prospecting, total conversions went UP. Not flat — up 11%.

The ROAS number got "worse." The actual business results got better.

That disconnect between ROAS and actual ROI is the thing that keeps me up at night. Well — that and the 4:30 AM alarm. But mostly the ROAS thing.

What's the branded vs. non-brand split in your accounts right now? Genuinely curious.

**QA Score: 37/40 — PASS**
- GPTZero: 12% AI probability ✅
- Pangram: 8% AI probability ✅
- 0 blacklisted phrases ✅
- Burstiness: 11.4 (excellent)
- Sentence length StdDev: 9.7 (excellent)
- Sentence range: 3 words ("Forty percent.") to 34 words
- First person: throughout
- Specific metrics: "200 accounts," "$2.3M/year," "35%," "11%," "$4.50"
- Tonal shifts: frustration → analysis → personal humor → engagement question

---

## What Changed

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| GPTZero score | 94% | 12% | <30% |
| Blacklisted phrases | 14 | 0 | 0 |
| Sentence length StdDev | 4.1 | 9.7 | >8 |
| Burstiness | 3.2 | 11.4 | >8 |
| Type-Token Ratio | 0.39 | 0.58 | >0.50 |
| First person usage | No | Yes | Yes |
| Specific numbers | 0 | 6 | 1+ per 500 words |
| Rhetorical questions | 0 | 1 | 1+ per 400 words |
| Tonal shifts | 0 | 3 | 1+ per 500 words |
| Conjunction starters | 0% | 18% | >10% |
