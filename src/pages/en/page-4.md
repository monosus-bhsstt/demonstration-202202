---
title: On modern CSS design and build tools
description: Lorem ipsum dolor sit amet - 4
layout: ../../layouts/MainLayout.astro
---

TL;DR Vite,Astro.js,css-in-js

## Module javascript

In 2014, webpack was introduced and it changed the foundation of web development. At the time, the idea of how to reduce the number of render-blocked points and shake off descriptions that are unnecessarily included in the implementation was novel and revolutionary. I think this was a novel and revolutionary idea.

Eight years later, webpack may have outlived its usefulness.

![state of js 2021 build tool](https://stateofx-images.netlify.app/captures/js2021/en-US/build_tools_experience_ranking.png)

> Bundling all assets = huge javascript files

This problem is becoming more and more noticeable as IE's market share declines.
Modern browsers can now load javascript files per module, so fast build tools using Vite and esbuild should become the mainstay in the future.

[モジュール javascript の例](https://plnkr.co/edit/VF8op2UYjtEmf4Qj?p=preview&preview)

## Run Time JS is not necessary

Next.js, Nuxt, and Gatsby are very popular SSGs that use node.js, and if you try them, you will be amazed at the flexibility of their design. However, this does not mean that there are no disadvantages.

When working across vendors, embedding in legacy CMSs, or working with developers who are allergic to modern coding, you need to get them to agree to the SSG framework "etiquette".

The biggest point where you cannot get them to agree is "Run Time JS".

In other words, the aforementioned pre-rendered html file is only "pre", and modifying the output html file will not modify the display in the browser.

The solution to this problem is Astro.js. (This website was also created with Astro.js.)
Using Vite, you can use not only React, but also Vue, Svelte, Solid, Preact, and many other js frameworks that have appeared since React.
The final output is static HTML, CSS, and a modularized js file.
It is still an alpha version, but due to its nature, it is separated from the environment after it is built, so it can be used for production.

The best solution for ## style

Since the introduction of BEM in 2007, one of the requirements of a good coder has been to be able to create good class names.

Good CSS is

- Not too detailed
- Reusable
- Predictable

This is all from a developer's point of view, and from a browser's (user's) point of view, it is

- Small size
- No unnecessary descriptions
- Appropriate scope

However, this is all from the developer's perspective.

In the transitional phase of web development, one of the most uncertain issues is how to construct styles. With so many options out there, the current choices are

> Use of scoped CSS and utility classes with css variables seems to be the most convenient.

is likely to be more convenient.

### Legacy BEM

```html
<div class="Block">
  <div class="Block__element">
    <div class="Block__element--modifier"></div>
  </div>
</div>
```

From my personal point of view, the biggest problem with the old CSS design represented by BEM is that html does not know how to behave itself, but CSS knows the markup structure (html depends on css).

However, I think it is almost impossible to completely solve the dependency due to the structure of html and css. So, let's granularize the dependencies to the component level instead of the whole site or page level.

The following is a concept called css-in-js, which combines styles and markup within a single React component.

### Styled-component (React)

```javascript
// style
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: black;
    `}
`;
// mark up
render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>

    <Button as={Link} href="/docs">
      Documentation
    </Button>
  </div>
);
```

In the browser, it will look like the following.

```html
<div>
  <a
    href="https://github.com/styled-components/styled-components"
    target="_blank"
    rel="noopener"
    class="sc-gsDKAQ bcQEio"
    >GitHub</a
  >
  <a href="/docs" class="Link__StyledLink-sc-cnbpkq-0 dMvCgK sc-gsDKAQ erBbkF"
    >Documentation</a
  >
</div>
```

![styled-component image](/styledcomponent.png)

The advantage is that the style named `Button` in the above file will be encapsulated and used only within that component.

So if you need a button design with other behavior, you don't have to worry about naming it `button-hoge` or `p-button-awsome`. You can use the new `Button` in any other file.
Instead of spending time on naming, you can use a separate style guide or other documentation.

- When to use it
- What file is it in?
- What functions can be added?

It is more useful to describe shared items such as when to use it, which file it is in, and what functions can be given to it, in order to improve maintainability.

### Reference: Utility Class (TailWindCss)

```html
<button
  type="button"
  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
  aria-expanded="false"
>
  <span class="sr-only">Open main menu</span>
  <!-- Heroicon name: outline/menu -->
  <svg
    class="h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</button>
```

The idea is that each class has only one function, and multiple classes can be combined to achieve a style.

In other words

- Normal CSS -> Modeling with clay
- Designing css with Utility Class → Assembling with LEGO blocks

There is a difference between the two. Once you get used to it, you can create a site using only markup, which speeds up development, but if you use it for static coding, you will need to change all pages when changing styles.

- Implement a framework.
- Set up guidelines for component design and define when to use Utility class

In this case, it is necessary to define when to use the utility class.
