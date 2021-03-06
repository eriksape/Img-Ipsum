/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize category="object,lang,array,collection" -o lodash`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var baseIsNative = require('./_baseIsNative'),
    isMaskable = require('./_isMaskable');

/**
 * Checks if `value` is a pristine native function.
 *
 * **Note:** This method can't reliably detect native functions in the
 * presence of the `core-js` package because `core-js` circumvents this kind
 * of detection. Despite multiple requests, the `core-js` maintainer has made
 * it clear: any attempt to fix the detection will be obstructed. As a result,
 * we're left with little choice but to throw an error. Unfortunately, this
 * also affects packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
 * which rely on `core-js`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (isMaskable(value)) {
    throw new Error('This method is not supported with `core-js`. Try https://github.com/es-shims.');
  }
  return baseIsNative(value);
}

module.exports = isNative;
