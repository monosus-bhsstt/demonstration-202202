---
title: Why React?
description: Lorem ipsum dolor sit amet - 2
layout: ../../layouts/MainLayout.astro
---

I'll spare you the detailed explanation of React.

The following are the downloads of major frameworks by npm in the last two years.
![3大フレームワークダウンロード推移](/reactvveuvangular.png "3大フレームワークダウンロード推移")

## What's good about React?

Based on the premise that there is nothing that cannot be achieved with React in today's web applications, the most notable advantages over static coding are

- The ability to develop at the component layer rather than the page layer
- Server-side and client-side implementations can be realized in component units.
- Logic, style, and markup can be encapsulated at the component level.
- Type-safe component management using TypeScript
- Easily read external data
  For example

If a text link element has a property (attribute) named [PDF], a PDF icon will be inserted and an external link will be set at the same time.
Image elements can have their size attribute automatically filled in, and throw an error if the alt attribute is missing.
Generate video links with thumbnails by simply passing the Youtube video ID as an argument.
Load the destination page before clicking for fast transitions.
Manage text content as json and insert it as an argument to the p tag, etc.
Of course, other frameworks can do the same thing. The advantages of React compared to other frameworks are

- Affinity with TypeScript
- Richness of OSS libraries
- A large amount of knowledge and a large number of developers
- The following are some of the advantages of React.

## Is React the best?

React has a big problem. React has one major problem: it affects the performance of the initial display.

Applications built with React are displayed only after the javascript has finished executing. If the design of the implementation is not optimized, the amount of content and complexity of the page will slow down the initial rendering. Think of a common loading screen, for example.

```html
<html>
  <head>
    <title>sample</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/js/bundle.js"></script>
  </body>
</html>
<!-- A common React App. html exists only for javascript execution. -->
```

![No pre-rendring](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

This is fine for applications that require a lot of user interaction, but it is not effective for marketing or blog sites.

To solve this problem, we can use SSG (Static Site Generator) to retrieve the data necessary to display the page in advance and output a static HTML file for each page. Then, when a request is made to the server, this HTML file is returned. It is recommended to use this method.

![With pre-rendring](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)

In addition to SSG, there are other page management methods using SSR (Server Side Rendering) and SSI, but from the perspective of site performance, SSG should be adopted unless you can answer "No" to the following questions.

> Q. Is it possible to pre-render this page before the user requests it?
