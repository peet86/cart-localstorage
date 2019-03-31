# cart-localstorage

#### Super simple JavaScript shopping cart library

This micro library utilizes the browser's localStorage to create a persistent shopping cart instance. 


## Demo 

[Cart demo](http://peet86.github.io/cart-localstorage)


## Install: 

Use npm or yarn to add it to your ES6 project: 

``` 
npm install cart-localstorage
```

```
yarn add cart-localstorage
```

OR use the bundled version: 

```
<script src="cart-localstorage.js"></script>
```


## Example

``` 
import { add, total } from 'cart-localstorage' 

add({id: 1, name: "Product 1", price: 100})
add({id: 2, name: "Product 2", price: 100}, 2)

console.log(total()) 
// output: 300
```



## API 

#### add(product, [quantity:1])

Adds a product into the cart. If the product is already exists (same id) it increases the quantity of the product with 1. 
"Product" always should be a JavaScript object with "id" and "price" mandatory properties.

```
const myproduct = {id: 3, name: "Vans", price: 75}
add(myproduct, 2)
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
// [{id: 1, name: "Nike Air", price: 100, quantity: 1}, {id: 2, name: "Adidas Superstar", price: 120, quantity: 2}]
``` 

#### remove(id)

Removes product from the cart

```
remove(1)
```

#### update(id, property, value)

Updates product's property with a certain value.
```
update(1,'price',200)
```

#### total([reducer])

By default it returns with the total price:  

```
total()
// 220
```
or you can pass a custom reducer function as the first argument and have full control over the calculation.


#### detroy()

Deletes the cart array from localStorage.

```
detroy()
```



## License

This plugin is available under Apache 2.0 license.