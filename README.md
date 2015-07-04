# PostCSS Scopify [![Build Status][ci-img]][ci]

[PostCSS] plugin that adds a user input scope to each selector.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/pazams/postcss-scopify.svg
[ci]:      https://travis-ci.org/pazams/postcss-scopify

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-scopify') ])
```

See [PostCSS] docs for examples for your environment.
