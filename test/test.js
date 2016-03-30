var assert    = require('assert');
var fs        = require('fs');
var postcss   = require('postcss');
var scopify = require('..');

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}

describe('postcss-scopify', function() {
  it('scopes all selectors with an id', function() {
    var output = postcss()
                .use(scopify('#foo'))
                .process(fixture('id.css')).css;
    var expected = fixture('id.expected.css');

    assert.equal(output, expected);
  });

  it('scopes all selectors with a class', function() {
    var output = postcss()
                .use(scopify('.boo'))
                .process(fixture('class.css')).css;
    var expected = fixture('class.expected.css');

    assert.equal(output, expected);
  });

  it('does NOT adds a scope if it already exists', function() {
    var output = postcss()
                .use(scopify('.boo'))
                .process(fixture('exisiting.css')).css;
    var expected = fixture('exisiting.expected.css');

    assert.equal(output, expected);
  });

  it('does not allow invliad scopes', function() {
      try
      {
          postcss()
          .use(scopify('#foo , #boo'))
          .process(fixture('id.css')).css;
      }
      catch(error){
          assert.equal(error.name+'.'+error.reason, 'CssSyntaxError.invalid scope');
      }

  })

  // https://github.com/pazams/postcss-scopify/issues/7
  it('should not scope keyframe definitions', function() {
    var output = postcss()
                .use(scopify('#foo'))
                .process(fixture('keyframe.css')).css;
    var expected = fixture('keyframe.expected.css');

    assert.equal(output, expected);
  });

});
