
jest.mock('../utils/localstorage.js');

import { get, list, add, destroy, remove, update, subtotal, total } from '../index'
import { get as getLocalStorage, save as saveLocalStorage, clear as clearLocalStorage } from '../utils/localstorage.js';

const PRODUCT_1 = { id: 1, name: "1", quantity: 1, price: 10 }
const PRODUCT_1B = { id: 1, name: "b", quantity: 1, price: 10 }
const PRODUCT_2 = { id: 2, name: "2", quantity: 1, price: 20 }
const PRODUCT_3 = { id: 3, name: "3", quantity: 1, price: 30 }

const CART_0 = []
const CART_1 = [PRODUCT_1]
const CART_12 = [PRODUCT_1, PRODUCT_2]
const CART_11B2 = [PRODUCT_1, PRODUCT_1B, PRODUCT_2]


describe('Cart', () => {

	describe('get', () => {

		it('should return with one object', () => {

			getLocalStorage.mockReturnValue(CART_12);

			const item = get(1);

			expect(item).toBeInstanceOf(Object);
		});

		it('should return with the first matching product', () => {

			getLocalStorage.mockReturnValue(CART_11B2);

			const item = get(1);

			expect(item).toEqual(PRODUCT_1);
		});

		it('should return with the correct product', () => {

			getLocalStorage.mockReturnValue(CART_12);

			const item = get(2);

			expect(item).toEqual(PRODUCT_2);
		});

	});

	describe('list', () => {

		it('should return with all the products', () => {

			getLocalStorage.mockReturnValue(CART_12);

			expect(list()).toHaveLength(2);

		});

	});

	describe('add', () => {

		it('should add the new product to the empty cart', () => {

			getLocalStorage.mockReturnValue(CART_0);

			add(PRODUCT_1);

			expect(saveLocalStorage).toBeCalledWith(CART_1);

		});


		it('should add new product when the product does not exists in the cart ', () => {

			getLocalStorage.mockReturnValue(CART_1);

			add(PRODUCT_2);

			expect(saveLocalStorage).toBeCalledWith(CART_12);

		});

		it('should increase the quantity when the product exists in the cart ', () => {

			getLocalStorage.mockReturnValue(CART_12);

			add(PRODUCT_2);

			expect(saveLocalStorage).toBeCalledWith([PRODUCT_1, { ...PRODUCT_2, quantity: 2 }]);

		});


	})

	describe('remove', () => {


		it('should remove the correct item', () => {
			getLocalStorage.mockReturnValue(CART_12);

			remove(1);

			expect(saveLocalStorage).toBeCalledWith([PRODUCT_2]);

		})

		it('should not remove anything when the id is null', () => {

			getLocalStorage.mockReturnValue(CART_12);

			remove();

			expect(saveLocalStorage).toBeCalledWith(CART_12);

		})

		it('should not remove anything when the id is wrong', () => {

			getLocalStorage.mockReturnValue(CART_12);

			remove(5);

			expect(saveLocalStorage).toBeCalledWith(CART_12);

		})
	})

	describe('update', () => {
		it('should update existing product\'s quantity', () => {

			getLocalStorage.mockReturnValue(CART_12);

			update(1,"quantity", 5);
			expect(saveLocalStorage).toBeCalledWith([{ ...PRODUCT_1, quantity: 5 }, PRODUCT_2]);

		})

		it('should do nothing when the product does not exists', () => {

			getLocalStorage.mockReturnValue(CART_1);

			update(2,"quantity", 3);

			expect(saveLocalStorage).toBeCalledWith(CART_1);

		})

		it('should do nothing when the value is negative', () => {

			getLocalStorage.mockReturnValue(CART_1);

			update(1,"quantity", -1);
			expect(saveLocalStorage).toBeCalledWith(CART_1);

		})


	})

	describe('destroy', () => {

		it('should clear localStorage', () => {

			destroy();

			expect(clearLocalStorage).toBeCalled();

		})

	})

	describe('subtotal', () => {

		it('should be equal with price * quantity', () => {

			expect(subtotal(PRODUCT_1)).toBe(10);

		})

		it('should return 0 when price is missing ', () => {

			expect(subtotal({ quantity: 1 })).toBe(0);

		})

		it('should return 0 when quantity is missing ', () => {

			expect(subtotal({ price: 1 })).toBe(0);

		})

		it('should return 0 when the product is missing ', () => {

			expect(subtotal()).toBe(0);

		})

	})


	describe('total', () => {

		it('should return with cart total price', () => {

			getLocalStorage.mockReturnValue(CART_12);

			expect(total()).toBe(30);

		})

		it('should return 0 when cart is empty ', () => {

			getLocalStorage.mockReturnValue(CART_0);

			expect(total()).toBe(0);

		})

		it('should accept custom accumulator', () => {

			getLocalStorage.mockReturnValue(CART_12);

			const acc = (sum, product) => (sum += subtotal(product))

			expect(total(acc)).toBe(30);

		})

	})
});