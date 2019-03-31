// API 

const list = () => getStorage();

const get = (id) => getStorage().find((product) => product.id === id)

const exists = (id) => !!get(id)

const add = (product, quantity) => isValid(product) ? exists(product.id) ? update(product.id, 'quantity', get(product.id).quantity + (quantity || 1)) : saveStorage(getStorage().concat({ ...product, quantity: quantity || 1 })) : null;

const remove = (id) => saveStorage(getStorage().filter((product) => product.id !== id))

const update = (id, field, value) => saveStorage(getStorage().map((product) => product.id === id ? ({ ...product, [field]: value }) : product))

const total = (cb) => getStorage().reduce((sum, product) => isCallback(cb) ? cb(sum, product) : (sum += subtotal(product)), 0);

const destroy = () => clearStorage()

const listen = (cb) => listenStorage(cb)


// HELPERS

const isValid = (product) => product.id && product.price

const subtotal = (product) => isCalcable(product) ? (product.price * product.quantity) : 0

const isCalcable = (product) => (product && product.price && product.quantity)

const isCallback = (cb) => cb && typeof cb === Function


// STORAGE API 

const STORAGE_KEY = '__cart'

const getStorage = (key) => JSON.parse(localStorage.getItem(key || STORAGE_KEY)) || [];

const saveStorage = (data, key) => localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));

const clearStorage = () => localStorage.removeItem(STORAGE_KEY)

const listenStorage = (cb) => window.addEventListener('storage', (event, cb)=> (event,cb) => {
	if(event.key === STORAGE_KEY){
		cb(get(STORAGE_KEY))
	}
})  

export { list, get, add, remove, update, total, destroy, exists, subtotal, listen };
