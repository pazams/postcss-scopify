# PostCSS Scopify [![Build Status][ci-img]][ci]

[PostCSS] plugin that adds a user input scope to each selector.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/pazams/postcss-scopify.svg
[ci]:      https://travis-ci.org/pazams/postcss-scopify

__Example input__

```css
.foo, .boo h1 {
    /* declarations */
}
```
__Example output__
`scopify('#scope')`
```css
#scope .foo, #scope .boo h1 {
    /* declarations */
}
```

## Installation

```
npm install postcss-scopify
```

## Usage

```javascript
var fs        = require('fs');
var postcss   = require('postcss');
var scopify   = require('postcss-scopify');

var css = fs.readFileSync('css/my-file.css', 'utf8').toString();
var out = postcss()
          .use(scopify('#bul'))
          .process(css)
          .css;
```

You can use PostCSS with your build tool.
Note there are plugins for [Grunt], [Gulp], [webpack], [Broccoli],
[Brunch] and [ENB]. 
See [PostCSS] docs for examples for your environment.
