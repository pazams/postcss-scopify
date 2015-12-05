# PostCSS Scopify [![Build Status][ci-img]][ci]

[PostCSS] plugin that adds a user input scope to each selector.
for a command line interface, see [scopify-cli]. 

[`poststylus`]: https://github.com/seaneking/poststylus
[PostCSS API]:  https://github.com/postcss/postcss/blob/master/docs/api.md
[Broccoli]:     https://github.com/jeffjewiss/broccoli-postcss
[CLI tool]:     https://github.com/code42day/postcss-cli
[webpack]:      https://github.com/postcss/postcss-loader
[Brunch]:       https://github.com/iamvdo/postcss-brunch
[Grunt]:        https://github.com/nDmitry/grunt-postcss
[Gulp]:         https://github.com/postcss/gulp-postcss
[ENB]:          https://github.com/theprotein/enb-postcss

[scopify-cli]: https://github.com/pazams/scopify-cli
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
          .use(scopify('#scope'))
          .process(css)
          .css;
```

You can use PostCSS with your build tool.
Note there are plugins for [Grunt], [Gulp], [webpack], [Broccoli],
[Brunch] and [ENB]. 
See [PostCSS] docs for examples for your environment.

## Change Log
### v0.1.4
fixes [#4](https://github.com/pazams/postcss-scopify/issues/4)
