---
title: How telemetry and logs are important
description: How telemetry and logs are important
createdAt: 1740587280
updatedAt: 1740587280
slug: how-telemetry-and-logs-are-important
---

# How telemetry and logs are important

_2025-02-26_

Our oldest, latest app somehow hits its highest spike ever on a production database. Why? We don’t know. After we upgraded our database to postgres v16, it got the spike that never happened before.

In a slow, chill happy morning, it was a Monday standup meeting and we’re chilling after our latest push to production last week. We got no complaints so we’re thinking we’re doing good so far, or so we thought. Our boss came in, and said our production database got 100% max CPU over the last weekend. We all got uneasy and feeling dizzy trying to understand and remember what we've changed to get the DB max out.

We first got into CloudWatch to see if any logs are helpful. Turns out, not a single log is present, nothing, 0 bytes. Didn’t we configure the logs? Or am I pulling from the wrong log? We’re running out of time. I went to the RDS’s monitor instead, and pulled out the top most expensive queries. I can’t even understand the numbers, it took 150 to 300 seconds to complete a single query. After finding out where that query is coming from. We concluded it was coming from our background task. So we all hurried to fix that query ASAP, look for optimization. And things begin to get better. Our DB does not get maxed out like before.

In conclusion, when developing a feature, we should consider adding logs, and more importantly measure our code to see how well it is running on prod before we commit a change.
