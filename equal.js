var SlowBuffer = require('buffer').SlowBuffer

/*
 * Returns true if the values `a` and `b` are equal.
 *
 * Support for circular structures is implemented through the `seen` argument,
 * expected to be an object with the following signature: `{ a: [], b: [] }`.
 */
function equal(a, b, seen) {
  if (a === b) {
    return true
  }

  if (Number.isNaN(a)) {
    return Number.isNaN(b)
  }

  // identical primitive values and functions would have caused the function
  // to return by now, so the fact that we've come this far means `a` and `b`
  // can't be equal
  if (!(a instanceof Object) || typeof a === 'function') {
    return false
  }

  var type = Object.prototype.toString.call(a)

  if (Object.prototype.toString.call(b) !== type) {
    return false
  }

  var keys = Object.keys(a).sort()
    , other = Object.keys(b).sort()

  for (var i = 0; i < keys.length; i++) {
    if (keys[i] !== other[i]) {
      return false
    }
  }

  var index = seen.a.indexOf(a)

  if (index > -1) {
    return seen.b.indexOf(b) === index
  }

  seen.a.push(a)
  seen.b.push(b)

  if (type === '[object Error]') {
    var first = Error.prototype.toString.call(a)
      , second = Error.prototype.toString.call(b)

    if (first !== second) {
      return false
    }
  }

  else if (type === '[object RegExp]') {
    if (a.source !== b.source ||
        a.global !== b.global ||
        a.multiline !== b.multiline ||
        a.ignoreCase !== b.ignoreCase) {
      return false
    }
  }

  else if (type === '[object Date]') {
    if (a.getTime() !== b.getTime()) {
      return false
    }
  }

  else if (type === '[object Boolean]' ||
           type === '[object Number]' ||
           type === '[object String]') {
    if (!equal(a.valueOf(), b.valueOf())) {
      return false
    }
  }

  else if (a instanceof Buffer) {
    if (!(b instanceof Buffer)) {
      return false
    }

    keys = keys.filter(function (key) {
      return key !== 'parent' && key !== 'offset'
    })
  }

  else if (a instanceof SlowBuffer) {
    if (!(b instanceof SlowBuffer)) {
      return false
    }

    keys = keys.filter(function (key) {
      return key !== 'used'
    })
  }

  for (var j = 0; j < keys.length; j++) {
    var key = keys[j]

    if (!equal(a[key], b[key], seen)) {
      return false
    }
  }

  return true
}

module.exports = function (a, b) {
  return equal(a, b, { a: [], b: [] })
}
