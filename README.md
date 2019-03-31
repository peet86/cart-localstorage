# cart-localstorage
Super simple shopping cart library

This library utilizes the browser's localStorage and creates a persistent shopping cart instance during the first add(product) call. 

## Install: 

This is a JavaScript ES6 library. Use npm or yarn to add it to your project: 

``` 
npm install cart-localstorage
```

```
yarn add cart-localstorage
```

## Example 

``` 
import { add, total } from 'cart-localstorage' 

add({id: 1, name: "Product 1", price: 100})
add({id: 2, name: "Product 2", price: 100}, 2)

console.log(total()) 
// output: 300
```

## Demo 

//todo 


## API 

#### add(product, [quantity:1])

Adds a product into the cart. If the product is already exists (same id) it increases the quantity with +1. 
"Product" should be a JavaScript object with "id" and "price" properties.

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