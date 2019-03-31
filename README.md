# cart-localstorage
Super simple shopping cart library with a very small footprint (~1Kb, 0 dependencies)


## Demo 

//todo 


## Install: 

This is a JavaScript ES6 library. Use npm or yarn to add it to your project: 

``` 
npm install cart-localstorage

or 

yarn install cart-localstorage

```

## How to start? 

``` 
import { add, total } from 'cart-localstorage' 

add({id: 1, name: "Product 1", price: 100}, 1)

console.log(total()) 
// output: 100

...
```

## Features

#### add(<product>)

Adds product into the cart. If a product exists with the same <id> increases the quantity.  

```
add({id: 3, name: "Vans", price: 75, quantity: 2})
```

#### get(<id>)

Get product by id 

```
get(1)
// {id: 1, name: "Nike Air", price: 100, quantity: 1}
```

#### exists(<id>)

Checks if the product is already exists in the cart

```
exists(21)
// true or false
```

#### list()

Dumps the cart as an array of products. 

``` 
list()
// [{id: 1, name: "Nike Air", price: 100, quantity: 1}, {id: 1, name: "Adidas Superstar", price: 120, quantity: 2}]
``` 

#### remove(<id>)

Removes the product from the cart

```
remove(1)
```

#### update(<id>, <field>, <valud>)

Updates product's field with a certain value.
```
update(1,'price',200)
```

#### total(<callback>)

By default it returns with the total price:  

```
total()
// 220
```
or you can pass a custom reducer function as first argument and return with a custom field's total value.


#### detroy()

Deletes the cart array from localStorage.

```
detroy()

```



## License

This plugin is available under Apache 2.0 license.