var cartLS = (function (exports) {
	'use strict';

	const STORAGE_KEY = '__cart';

	let saveListener = null;
	const listen = (cb) => { saveListener = cb; }; // ugly but storage listener is not working for the same window..

	const get = (key) => JSON.parse(localStorage.getItem(key || STORAGE_KEY)) || [];

	const save = (data, key) => {
		localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));
		if(saveListener) saveListener(get(key || STORAGE_KEY));
	};

	const clear = () => {
		localStorage.removeItem(STORAGE_KEY);
		if(saveListener) saveListener(get(key || STORAGE_KEY));
	};

	const list = () => get();

	const get$1 = (id) => get().find((product) => product.id === id);

	const exists = (id) => !!get$1(id);

	const add = (product, quantity) => isValid(product) ? exists(product.id) ? update(product.id, 'quantity', get$1(product.id).quantity + (quantity || 1)) : save(get().concat({ ...product, quantity: quantity || 1 })) : null;

	const remove = (id) => save(get().filter((product) => product.id !== id));

	const update = (id, field, value) => save(get().map((product) => product.id === id ? ({ ...product, [field]: value }) : product));

	const total = (cb) => get().reduce((sum, product) => isCallback(cb) ? cb(sum, product) : (sum += subtotal(product)), 0);

	const destroy = () => clear();

	const onChange = (cb) => isCallback(cb) ? listen(cb) : console.log(typeof cb);


	const isValid = (product) => product.id && product.price;

	const subtotal = (product) => isCalcable(product) ? (product.price * product.quantity) : 0;

	const isCalcable = (product) => (product && product.price && product.quantity);

	const isCallback = (cb) => cb && typeof cb === "function";

	exports.add = add;
	exports.destroy = destroy;
	exports.exists = exists;
	exports.get = get$1;
	exports.list = list;
	exports.onChange = onChange;
	exports.remove = remove;
	exports.subtotal = subtotal;
	exports.total = total;
	exports.update = update;

	return exports;

}({}));
