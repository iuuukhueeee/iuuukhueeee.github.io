---
title: Logging Flask Applications on AWS Elastic Beanstalk with CloudWatch
description: Logging Flask Applications on AWS Elastic Beanstalk with CloudWatch
createdAt: 1754130651
updatedAt: 1754130651
slug: logging-flask-applications-on-aws-elastic-beanstalk-with-cloudwatch
---

# Logging Flask Applications on AWS Elastic Beanstalk with CloudWatch

_2025-08-02_

# Outline

1. What is Elastic Beanstalk?
2. Initialize Flask application
3. Deploy to Elastic Beanstalk
4. Testing and Verification

# Overview

This tutorial guides you through setting up centralized logging for a Flask web application deployed on AWS Elastic Beanstalk, with logs automatically streamed to Amazon CloudWatch. You'll learn how to configure structured logging in your Flask app, deploy it using Elastic Beanstalk's managed platform, and query your application logs using CloudWatch Logs Insights.

# Prerequisites

- An AWS account
- Python 3.11 and above
- A code editor
- Estimated time: 30 minutes

# What You'll Build

By the end of this tutorial, you'll have:

- A Flask web application with structured logging that captures user interactions and application events.
- An Elastic Beanstalk deployment that automatically scales and manages your application infrastructure.
- CloudWatch integration that streams your application logs in real-time to AWS's centralized logging service.
- Log querying capabilities using CloudWatch Logs Insights to search, filter, and analyze your application's behavior in production.

# 1. What is Elastic Beanstalk?

Based on the offical AWS document. Elastic Beanstalk is a service to easily migrate, deploy, and scale full-stack applications on AWS. It is a fully managed service, meaning it will handle underlying resources such as EC2 instance, database RDS, load balancer and more... There is no charge of service but you will have to pay for the resources that your application consumes.

> This tutorial is focus on logging Flask application and query them on CloudWatch. For more additional information about Elastic Beanstalk. Please visit [concepts in Elastic Beanstalk.](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.html)

# 2. Initialize Flask application

## Create an environment

```bash
$ mkdir logging
$ cd logging
$ python3 -m venv .venv
```

## Activate the environment

```bash
$ source .venv/bin/activate
```

## Install Flask

```bash
(.venv) $ pip install Flask
```

## Initializing the App

```bash
(venv) $ mkdir app
```

The `__init.py__` for the app package is going to contain the following code:

> Thank you Miguel for an amazing [tutorial.](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

#### **`app/__init__.py: Flask application instance`**

```python
from flask import Flask
from logging.config import dictConfig

dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "wsgi": {
                "class": "logging.StreamHandler",
                "stream": "ext://flask.logging.wsgi_errors_stream",
                "formatter": "default",
            }
        },
        "root": {"level": "INFO", "handlers": ["wsgi"]},
    }
)

application = Flask(__name__)
from app import routes
```

For more information about logging. You can take a look at [Flask logging](https://flask.palletsprojects.com/en/stable/logging/#basic-configuration) and [Python's logging.](https://docs.python.org/3/library/logging.config.html#dictionary-schema-details)

#### **`app/routes.py: Home page route`**

```python
from app import application

@application.route('/')
@application.route('/index')
def index():
    application.logger.info("Hello user")
    return "Hello, World!"
```

#### **`application.py: Main application module`**

```python
from app import application
```

Now activate the Flask app by setting the `FLASK_APP` environment variable and test our app:

```bash
(.venv) $ export FLASK_APP=application.py
(.venv) $ flask run
```

The reason why named our main app is `application.py` and inside that we export an `application` variable is because Elastic Beanstalk is searching for the specific variable `application`inside `application.py`. You can read more at [AWS's offical docs](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-specific.html#command-options-python)

If you can see a screen like this, then you're successfully setup the project.

![Flask hello world](/images/logging_to_cloudwatch/flask_hello_world.png)

One final step is to create a `requirements.txt` file to let Elastic Beanstalk knows which library to install

```bash
(.venv) pip freeze > requirements.txt
```

The initial structure is done.

Below is a diagram of the project structure so far

```text
.
├── app
│   ├── __init__.py
│   └── routes.py
├── application.py
└── requirements.txt

2 directories, 4 files
```

Now let's zip the project by

```bash
zip -r flask.zip app/ requirements.txt application.py
```

# 3. Deploy to Elastic Beanstalk

## Initialize Application

Go to Elastic Beanstalk -> Create application

### Environment tier

Choose `Web server environment`

![Environment tier](/images/logging_to_cloudwatch/image.png)

### Application information

Enter your application name. I'll choose Flask

![Application information](/images/logging_to_cloudwatch/image-1.png)

### Environment information

Leave everything as default

![Environment information](/images/logging_to_cloudwatch/image-2.png)

### Platform

Select `Managed platform` and choose `Python` since we're using Flask

![Platform](/images/logging_to_cloudwatch/image-3.png)

### Application code

Choose Upload your code.

Version label I'll name it `v1`

Local file, choose the `flask.zip` file we archive earlier.

![Application code](/images/logging_to_cloudwatch/image-4.png)

### Presets

Choose `Single instance (free tier eligible)`

![Presets](/images/logging_to_cloudwatch/image-5.png)

## Configure Service Access

Use the default service role and EC2 instance profile that Elastic Beanstalk create for us.

![Configure Service Access](/images/logging_to_cloudwatch/image-6.png)

If you dont have one, you can create a new one by click on `Create role` on the right.

## Setup networking

![Setup networking](/images/logging_to_cloudwatch/image-7.png)

You can choose default VPC with any subnet you want.

## Configure instance traffic and scaling

We can leave everything as default and click Next.

## Configure updates, monitoring, and logging

At the bottom you will see `Instance log streaming to CloudWatch logs`. Be sure to click on Enable Log streaming. I will choose a retention of 1 day.

![Configure updates, monitoring, and logging](/images/logging_to_cloudwatch/image-8.png)

You can also choose whether you want to keep the logs after the environment is terminated.

## Review

Finally, review the configuration then click Create.

![Review](/images/logging_to_cloudwatch/review.png)

When the environment successfully launched we can check by pressing on the Domain Elastic Beanstalk gave us.

![Result](/images/logging_to_cloudwatch/image-9.png)

It is working!

# 4. Testing and Verification

Now because in our routes we have a logging statement whether a user visit our main page. Let's check it in CloudWatch

```python
application.logger.info("Hello user")
```

Go to CloudWatch -> Logs -> Logs Insights. I will select the `web.stdout.log` group

![Selection criteria](/images/logging_to_cloudwatch/image-10.png)

The log have a specific string `Hello`. So I will query for that string.

I changed the query from

```
fields @timestamp, @message, @logStream, @log
| sort @timestamp desc
| limit 10000
```

to

```
fields @timestamp, @message, @logStream, @log
| filter @message like "Hello"
| sort @timestamp desc
| limit 10000
```

![Query result](/images/logging_to_cloudwatch/image-11.png)

# Troubleshooting

### Application Deployment Issues

**Problem: Deployment fails with "Your WSGIPath refers to a file that does not exist"**

_Solution:_

- Ensure your main file is named `application.py` (not `app.py` or `main.py`)
- Verify the Flask app variable is named `application` inside `application.py`
- Check that `application.py` is in the root of your zip file, not inside a subdirectory

```bash
# Correct zip structure:
zip -r flask.zip app/ requirements.txt application.py

# Incorrect - creates extra directory:
zip -r flask.zip logging/
```

**Problem: "ModuleNotFoundError" during deployment**

_Solution:_

- Ensure `requirements.txt` includes all dependencies:

```bash
(.venv) $ pip freeze > requirements.txt
```

- Verify Flask is listed in requirements.txt with the correct version
- Check for typos in package names

**Problem: Application shows "502 Bad Gateway" after deployment**

_Solution:_

- Check your application logs in Elastic Beanstalk console under "Logs"
- Common causes:
  - Syntax errors in Python code
  - Import errors in `__init__.py`
  - Port binding issues (let Elastic Beanstalk handle ports)

### CloudWatch Logging Issues

**Problem: No logs appearing in CloudWatch**

_Solution:_

1. Verify log streaming is enabled in EB environment configuration:

   - Go to Configuration → Software → Edit
   - Check "Instance log streaming to CloudWatch logs" is enabled

2. Check IAM permissions:
   - Ensure the `aws-elasticbeanstalk-ec2-role` has CloudWatch logs permissions
   - Add this policy if missing:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

3. Wait 5-10 minutes - there's often a delay before logs appear

**Problem: Logs appear but custom application logs are missing**

_Solution:_

- Verify your logging configuration is correct in `__init__.py`
- Check you're using the right log level (INFO vs DEBUG)
- Ensure you're actually calling the logger:

```python
# Make sure you have this in your routes:
application.logger.info("Your log message")
```

**Problem: "No log groups found" in CloudWatch**

_Solution:_

- Check the correct AWS region (must match your EB environment region)
- Look for log group names like: `/aws/elasticbeanstalk/your-env-name/var/log/web.stdout.log`

### CloudWatch Logs Insights Query Issues

**Problem: Query returns no results despite logs being present**

_Solution:_

- Check the time range - adjust to cover when your logs were generated
- Verify you're searching the correct log group
- Use case-insensitive searches:

```
fields @timestamp, @message
| filter @message like /(?i)hello/
| sort @timestamp desc
```

**Problem: Query timeout or performance issues**

_Solution:_

- Narrow your time range
- Use more specific filters early in the query
- Limit results appropriately:

```
fields @timestamp, @message
| filter @timestamp > datefloor(@timestamp, 1h)
| filter @message like "ERROR"
| sort @timestamp desc
| limit 100
```

Most logging issues stem from configuration problems rather than code issues, so double-check your EB and CloudWatch settings first.
