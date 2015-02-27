# USD

> AMD/CommonJS Stampit factory for creating models to handle USD logic

__Install__

```
npm install usd
```

__Usage__

```javascript
var usd = require('usd');
var $price = usd().pennies(150);

console.log( $price.dollars() ); // => 1.50
```

## Docs

### Methods

#### `.pennies() -> Number`

Returns the value in pennies

#### `.pennies( val ) -> this`

Sets the value via pennies

#### `.dollars() -> String`

Returns the value in dollars

#### `.dollars( val ) -> this`

Sets the value via dollars

### Static

#### `.decimalAdjust( type, value, exp ) -> Number`

Decimal adjustment of a number

__Arguments__

* `type` - The type of adjustment
* `value` - The value
* `exp` - The exponent (the 10 logarithm of the adjustment base)

## License

MIT