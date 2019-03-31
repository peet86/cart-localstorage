# cart-localstorage
Super simple shopping cart library with a very small footprint (~1Kb, 0 dependencies)


## Demo 

//todo 


## Install: 

This is a JavaScript ES6 library. Use npm or yarn to add it to your project: 

``` 
npm install cart-localstorage
```

```
yarn add cart-localstorage
```

## How to start? 

``` 
import { add, total } from 'cart-localstorage' 

add({id: 1, name: "Product 1", price: 100}, 1)

console.log(total()) 
// output: 100
```

## Features

#### add(product, [quantity])

Adds product into the cart. If the product is already exists (same id) it increases the quantity with 1. 
The second quantity argument is optional, the default value is 1. 

```
add({id: 3, name: "Vans", price: 75}, 2)
```

#### get(id)

Get product by id 

```
get(1)
// {id: 1, name: "Nike Air", price: 100, quantity: 1}
```

#### exists(id)

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

#### remove(id)

Removes the product from the cart

```
remove(1)
```

#### update(id, field, value)

Updates product's field with a certain value.
```
update(1,'price',200)
```

#### total([reducer])

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