# cart-localstorage
Super Simple Shopping Cart on top of browser localStorage with a very small footprint (~1Kb, 0 dependencies)


## Demo 

//todo add codepen demo


## INSTALL: 

This is a JavaScript ES6 library. Use npm or yarn to add it to your project: 

``` 
npm install cart-localstorage

or 

yarn install cart-localstorage

```

## How to start? 

``` 
import Cart from 'cart-localstorage' 

Cart.add({id: 1, name: "Product 1", price: 100},1)

console.log(Cart.total()) 
// output: 100

...
```

## API 

#### list()

Array of products in the cart. 

``` 
list()
// output:  [{id: 1, name: "Nike Air", price: 100, quantity: 1}, {id: 1, name: "Adidas Superstar", price: 120, quantity: 2}]
``` 

#### get(<id>)

Get product by id 

```
get(1)
// output:  [{id: 1, name: "Nike Air", price: 100, quantity: 1}]
```

#### add(<product>)

Adds product into the cart. If a product exists with the same <id> increases the quantity only.  

```
add({id: 3, name: "Vans", price: 75, quantity: 2})
```

#### remove(<id>)

Removes product by id 

```
remove(1)
```

#### update(<id>,<quantity>)

Updates the product quantity on a specific product 
```
update(1,5)
```

total()

detroy()

```



## License

This plugin is available under Apache 2.0 license.