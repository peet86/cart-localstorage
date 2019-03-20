# js-cart-localstorage
Super simple ES6 JavaScript Shopping Cart on top of LocalStorage (&lt;1Kb)

## Demo 

//todo add codepen demo


## INSTALL: 

``` 
npm install cart-localstorage

or 

yarn install cart-localstorage

```

## Usage

``` 
import Cart from 'cart-localstorage' 

Cart.add({name: "Product 1", price: 200},1)

Cart.list().map((item)=>console.log(item))

...
```

## API 

``` 
list()

get()

add()

remove()

update()

total()

detroy()

```



## License

This plugin is available under Apache 2.0 license.