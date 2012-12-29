var SlowBuffer = require('buffer').SlowBuffer
  , equal = require('./')

/*
 * Generates a SlowBuffer instance containing the specified bytes.
 */
function slow(bytes) {
  var buffer = new SlowBuffer(bytes.length)
  for (var i = 0; i < bytes.length; i++) {
    buffer[i] = bytes[i]
  }
  return buffer
}

var empty = function () { }
  , simple =
    [ true,     null,                   null
    , true,     undefined,              undefined
    , false,    null, undefined

    , true,     true,                   true
    , true,     false,                  false
    , false,    true, false

    , true,     0,                      0
    , true,     0,                      -0
    , true,     1,                      1
    , true,     -100,                   -100
    , true,     123.45,                 123.45
    , true,     1234567890,             1234567890
    , true,     NaN,                    NaN
    , true,     Infinity,               Infinity
    , true,     -Infinity,              -Infinity
    , false,    0, 1
    , false,    100, -100
    , false,    123.45, 987.65
    , false,    123456789, 987654321
    , false,    Infinity, -Infinity

    , true,     '',                     ''
    , true,     'foo',                  'foo'
    , true,     'foo bar baz',          'foo bar baz'
    , true,     '\r;\n"\'',             '\r;\n"\''
    , true,     '等於 ίσος متساو',        '等於 ίσος متساو'
    , false,    '',                     ' '
    , false,    'foo',                  'bar'
    , false,    '別 drukčiji',           'drukčiji'

    , true,     new Boolean(true),      new Boolean(true)
    , true,     new Boolean(false),     new Boolean(false)
    , false,    new Boolean(true),      new Boolean(false)
    , false,    new Boolean(true),      true

    , true,     new Number(10),         new Number(10)
    , true,     new Number(NaN),        new Number(NaN)
    , false,    new Number(NaN),        new Number(0)
    , false,    new Number(123),        123

    , true,     new String('ding'),     new String('ding')
    , true,     new String('∆®…†'),    new String('∆®…†')
    , false,    new String('hello'),    new String('bye')
    , false,    new String('hello'),    'hello'

    , true,     /abc/,                  /abc/
    , true,     /def/i,                 /def/i
    , true,     /ghi/g,                 /ghi/g
    , true,     /jkl/m,                 /jkl/m
    , true,     /mno/igm,               /mno/igm
    , false,    /foo/,                  /foo/i
    , false,    /foo/g,                 /foo/i
    , false,    /foo/,                  /bar/

    , true,     new Date(0),            new Date(0)
    , true,     new Date(123456789),    new Date(123456789)
    , true,     new Date(-20406080),    new Date(-20406080)
    , false,    new Date(0),            0
    , false,    new Date(100),          new Date(200)

    , true,     new Buffer([]),         new Buffer([])
    , true,     new Buffer([1, 2, 3]),  new Buffer([1, 2, 3])
    , true,     slow([]),               slow([])
    , true,     slow([10, 20, 30]),     slow([10, 20, 30])
    , false,    new Buffer([1, 2, 4]),  new Buffer([1, 2])
    , false,    new Buffer([]),         slow([])
    , false,    new Buffer([0, 0]),     slow([0, 0])
    , false,    slow([34, 35, 36]),     slow([36, 35, 34])

    , true,     new Error(),            new Error()
    , true,     new Error(),            new Error('')
    , true,     new Error('blah'),      new Error('blah')
    , true,     new TypeError(),        new TypeError()
    , true,     new TypeError('abc'),   new TypeError('abc')
    , false,    new Error('a'),         new Error('b')
    , false,    new Error(),            new TypeError()
    , false,    new Error('foo'),       new TypeError('foo')
    , false,    new TypeError('c'),     new TypeError('d')

    , true,     empty,                  empty
    , false,    empty,                  function () { }
    , false,    function () { },        function () { }
    , false,    function foo() { },     function foo() { }

    , true,     [],                     []
    , true,     [1, 2, 3],              [1, 2, 3]
    , true,     [undefined],            [undefined]
    , true,     ['blue', null, 1],      ['blue', null, 1]
    , false,    [1, 2, 3],              [3, 1, 2]
    , false,    [],                     [undefined]

    , true,     {},                     {}
    , true,     { u: undefined },       { u: undefined }
    , true,     { a: 1, b: 2, c: 3 },   { b: 2, c: 3, a: 1 }
    , true,     { '1': 3, '2': 4 },     { '1': 3, '2': 4 }
    , true,     { 'Œ´Ø': 'åøı‰' },      { 'Œ´Ø': 'åøı‰' }
    , true,     { a: { b: {} } },       { a: { b: {} } }
    , true,     { fn: empty },          { fn: empty }
    , false,    { '1': 3, '2': 4 },     { '3': 1, '4': 2 }
    , false,    {},                     { undef: undefined }
    , false,    {},                     []
    ]
