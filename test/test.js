var assert  = require('assert');
var usd     = require('../');

describe('USD', function(){
  it('.pennies()', function(){
    var $amt = usd({ _pennies: 100 });
    assert.equal( $amt.pennies(), 100 );
  });

  it('.pennies( val )', function(){
    var $amt = usd().pennies(100);
    assert.equal( $amt.pennies(), 100 );
  });

  it('.dollars()', function(){
    var $amt = usd();
    assert.equal( $amt.pennies(150).dollars(), '1.50' );
    assert.equal( $amt.pennies(197).dollars(), '1.97' );
    assert.equal( $amt.pennies(2142).dollars(), '21.42' );
  });

  it('.dollars( val )', function(){
    var $amt = usd();
    assert.equal( $amt.dollars('1.50').pennies(), 150 );
    assert.equal( $amt.dollars('1.97').pennies(), 197 );
    assert.equal( $amt.dollars('21.42').pennies(), 2142 );
  });

  it('.toDollarsNoCents()', function(){
    var $amt = usd();
    assert.equal( $amt.pennies(150).toDollarsNoCents(), 1 );
    assert.equal( $amt.pennies(197).toDollarsNoCents(), 1 );
    assert.equal( $amt.pennies(2142).toDollarsNoCents(), 21 );
    assert.equal( $amt.pennies(2100).toDollarsNoCents(), 21 );
  });
});