
jest.mock('../utils/localstorage.js');

import { get, add, destroy, remove, update, subtotal, total, quantity } from '../index'

import { list, save, clear } from '../utils/localstorage.js';

const PRODUCT_1 = { id: 1, name: "1", quantity: 1, price: 10 }
const PRODUCT_1B = { id: 1, name: "b", quantity: 1, price: 10 }
const PRODUCT_2 = { id: 2, name: "2", quantity: 1, price: 20 }
const PRODUCT_3 = { id: 3, name: "3", quantity: 1, price: 30 }
const PRODUCT_4 = { id: 4, name: "4", quantity: 2, price: 30 }


describe('Cart', () => {

	describe('get', () => {

		it('should return with one object', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			const item = get(1);

			expect(item).toBeInstanceOf(Object);
		});

		it('should return with the first matching product', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_1B, PRODUCT_2]);

			const item = get(1);

			expect(item).toEqual(PRODUCT_1);
		});

		it('should return with the correct product', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			const item = get(2);

			expect(item).toEqual(PRODUCT_2);
		});

	});

	describe('list', () => {

		it('should return with all the products', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			expect(list()).toHaveLength(2);

		});

	});

	describe('add', () => {

		it('should not add product to the cart without id', () => {

			list.mockReturnValue([]);

			add({ name: "c", price: 100 });

			expect(save).not.toHaveBeenCalled();

		});

		it('should not add product to the cart without price', () => {

			list.mockReturnValue([]);

			add({ name: "c", id: 10 });

			expect(save).not.toHaveBeenCalled();

		});

		it('should add the new product to the empty cart', () => {

			list.mockReturnValue([]);

			add(PRODUCT_1);

			expect(save).toBeCalledWith([PRODUCT_1]);

		});


		it('should add new product when the product does not exists in the cart ', () => {

			list.mockReturnValue([PRODUCT_1]);

			add(PRODUCT_2);

			expect(save).toBeCalledWith([PRODUCT_1, PRODUCT_2]);

		});

		it('should increase the quantity when the product exists in the cart ', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			add(PRODUCT_2);

			expect(save).toBeCalledWith([PRODUCT_1, { ...PRODUCT_2, quantity: 2 }]);

		});

		it('should increase the quantity with the second parameter\'s value when the product exists in the cart ', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			add(PRODUCT_2, 2);

			expect(save).toBeCalledWith([PRODUCT_1, { ...PRODUCT_2, quantity: 3 }]);

		});

		it('should add the new product with the second parameter\'s value to the cart', () => {

			list.mockReturnValue([]);

			add(PRODUCT_1, 3);

			expect(save).toBeCalledWith([{ ...PRODUCT_1, quantity: 3 }]);

		});

	})

	describe('remove', () => {


		it('should remove the correct item', () => {
			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			remove(1);

			expect(save).toBeCalledWith([PRODUCT_2]);

		})

		it('should not remove anything when the id is null', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			remove();

			expect(save).toBeCalledWith([PRODUCT_1, PRODUCT_2]);

		})

		it('should not remove anything when the id is wrong', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			remove(5);

			expect(save).toBeCalledWith([PRODUCT_1, PRODUCT_2]);

		})
	})

	describe('update', () => {
		it('should update existing product\'s quantity', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			update(1, "quantity", 5);
			expect(save).toBeCalledWith([{ ...PRODUCT_1, quantity: 5 }, PRODUCT_2]);

		})

		it('should do nothing when the product does not exists', () => {

			list.mockReturnValue([PRODUCT_1]);

			update(2, "quantity", 3);

			expect(save).toBeCalledWith([PRODUCT_1]);

		})

		it('should do nothing when the value is negative', () => {

			list.mockReturnValue([PRODUCT_1]);

			update(1, "quantity", -1);
			expect(save).toBeCalledWith([PRODUCT_1]);

		})


	})


	describe('quantity', () => {
		it('should increase existing product\'s quantity by 2', () => {

			list.mockReturnValue([PRODUCT_4]);

			quantity(4, 2);
			expect(save).toBeCalledWith([{ ...PRODUCT_4, quantity: 4 }]);

		})

		it('should decrease existing product\'s quantity by 1', () => {

			list.mockReturnValue([PRODUCT_4]);

			quantity(4, -1);

			expect(save).toBeCalledWith([{ ...PRODUCT_4, quantity: 1 }]);

		})

		it('should remove existing product when quantity diff decreases new quantity bellow 0', () => {

			list.mockReturnValue([PRODUCT_4]);

			quantity(4, -5);
			expect(save).toBeCalledWith([]);
		})

		it('should remove existing product when quantity diff lowers quantity to 0', () => {

			list.mockReturnValue([PRODUCT_4]);

			quantity(4, -2);
			expect(save).toBeCalledWith([]);
		})


	})

	describe('destroy', () => {

		it('should clear localStorage', () => {

			destroy();

			expect(clear).toBeCalled();

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

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			expect(total()).toBe(30);

		})

		it('should return 0 when cart is empty ', () => {

			list.mockReturnValue([]);

			expect(total()).toBe(0);

		})

		it('should accept custom accumulator', () => {

			list.mockReturnValue([PRODUCT_1, PRODUCT_2]);

			const acc = (sum, product) => (sum += subtotal(product))

			expect(total(acc)).toBe(30);

		})

	})
});