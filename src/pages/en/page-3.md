---
title: Deploy
description: Lorem ipsum dolor sit amet - 3
layout: ../../layouts/MainLayout.astro
---

Treat products with passion and dryness.

## Use GIT:PR to ensure maintenance quality.

![pr image](https://image.itmedia.co.jp/ait/articles/1708/01/at-it-git-15-009.jpg)

> Did you double check!

> I didn't happen to (always).

If you introduce pull requests in your development flow, the above exchange will be eliminated. Even so, human error will still occur unless you can reduce the burden on those who double check.

To make use of pull requests, we need to update the concept of product backlog rather than the usage of github.

For example

```
Ticket xxxxxxxxx
Revision of 00.
Details in the attachment.

```

If the content of the ticket is only Wants or To-Be. Only the person who raised the ticket knows whether the modified or added item is required or not. Even if a separate meeting is set up, the product will contain content that only the meeting attendees can understand.

In order to solve this problem, it is desirable to add not only To-Be but also **Done condition** to the ticket, so that even if the ticket originator can't set the Done condition, the implementer or reviewer can input it, so that it can be changed from "Thoughts → Implementation" to "Thoughts → Things to do → Implementation". If you can't set the Done condition by the ticket originator, but the implementer or reviewer can, then the pull request will work properly.

```

Ticket xxxxxxxxx
Revision of ticket xxxxx.
See attached document for details.

## Condition for Done.

- The third text is replaced with the notation as per the document.
- Images are replaced as per guidelines
  etc.

```

## CI/CD

![ci/cd image](https://codezine.jp/static/images/article/11083/basic-flow.png)

In local development, no matter how careful you are, you may not be able to get rid of potential bugs. After the pull request is successfully approved, the CI tool will inspect it according to the coding rules you have set up, and if there are no problems, it will be uploaded to the server.

Even if you need to upload to the test server multiple times for complex implementations, you can always deploy under the same conditions with no mistakes.
The ci/cd tool will release only the difference files as configured, while manual FTP uploads will not eradicate over and under materialization.

Also, if you have a release/inspection task that you want to perform periodically at 23:00 every Tuesday, or if you want to release this page at midnight on January 1, you can set up batch processing to the development environment or server by setting up the necessary actions again.
