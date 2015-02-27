/**
 * USD
 */

if ( typeof module === "object" && module && typeof module.exports === "object" ){
  var isNode = true, define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define( function( require, exports, module ){
  module.exports = require('stampit')()
    .state({
      _pennies: 0
    })
    .enclose( function(){
      if ( typeof this.pennies === 'number' ){
        throw new Error('Do not create with `pennies` set');
      }
    })
    .methods({
      pennies: function( val ){
        if ( !val ) return this.toPennies();

        this._pennies = val;

        return this;
      }

    , dollars: function( val ){
        if ( !val && val != 0 ) return this.toDollars();

        val = Math.round( val * 100 );

        if ( isNaN( val ) ){
          throw new Error('Invalid dollars value');
        }

        this._pennies = val;

        return this;
      }

    , toDollars: function(){
        // parse as float incase of partial cents
        var pennies = parseFloat( pennies );

        if ( isNaN( pennies ) ){
          return '0';
        }

        module.exports.round10( cents / 100, -2 ).toFixed(2);
      }

    , toPennies: function(){
        return this._pennies;
      }

    , valueOf: function(){
        return this.toPennies();
      }
    });

  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number}      The adjusted value.
   */
  module.exports.decimalAdjust = function(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  };

  module.exports.round10 = function(value, exp) {
    return module.exports.decimalAdjust('round', value, exp);
  };

  return module.exports;
});