# cart-localstorage

#### Super simple JavaScript shopping cart library

This micro library utilizes the browser's localStorage to create a persistent shopping cart instance


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

OR use the bundled version (via CDN): 

```html
<script src="https://unpkg.com/cart-localstorage@1.1.2/dist/cart-localstorage.min.js" type="text/javascript"></script>

```

## Example

```javascript
import { add, total } from 'cart-localstorage' 

add({id: 1, name: "Product 1", price: 100})
add({id: 2, name: "Product 2", price: 100}, 2)

console.log(total()) 
// output: 300
```


## API 

#### add(product, [quantity:1])

Adds product to the cart. If the product already exists it increases the quantity with 1. 
The product object structure is flexible, only "id" and "price" are mandatory properties.

```javascript
const myproduct = {id: 3, name: "Vans", price: 75}
add(myproduct, 2)
```

#### get(id)

Get product from the cart by id 

```javascript
get(1)
// {id: 1, name: "Nike Air", price: 100, quantity: 1}
```

#### exists(id)

Checks if the product already exists in the cart

```javascript
exists(21)
// true or false
```

#### list()

Get the content of the cart as an array of products. 

```javascript
list()
// [{id: 1, name: "Nike Air", price: 100, quantity: 1}, {id: 2, name: "Adidas Superstar", price: 120, quantity: 2}]
``` 

#### remove(id)

Removes the product from the cart

```javascript
remove(1)
```

#### update(id, property, value)

Updates the product's property with a certain value.

```javascript
update(1,'price',200)
```

#### quantity(id, diff)

Increase / decrease product's quantity with a positive or negative value.

```javascript
quantity(22,-1) // will decrease the quantity of product [id:22] with 1.
```


#### total([reducer])

By default returns with the total price:  

```javascript
total()
// 220
```
or you can pass a custom reducer function to have full control over the calculation.


#### destroy()

Deletes the cart array from the browser's localStorage.

```javascript
destroy()
```



## License

This plugin is available under Apache 2.0 license.
