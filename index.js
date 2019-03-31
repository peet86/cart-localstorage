import { get as getStorage, save as saveStorage, clear as clearStorage } from './utils/localstorage'

const list = () => getStorage();

const get = (id) => getStorage().find((product) => product.id === id)

const exists = (id) => !!get(id)

const add = (product, quantity) => exists(product.id) ? update(product.id, 'quantity', get(product.id).quantity + 1) : saveStorage(getStorage().concat({ ...product, quantity: quantity || 1 }));

const remove = (id) => saveStorage(getStorage().filter((product) => product.id !== id))

const update = (id, field, value) => saveStorage(getStorage().map((product) => product.id === id ? ({ ...product, [field]: value }) : product))

const total = (cb) => getStorage().reduce((sum, product) => isCallback(cb) ? cb(sum, product) : (sum += subtotal(product)), 0);

const destroy = () => clearStorage()


const subtotal = (product) => isCalcable(product) ? (product.price * product.quantity) : 0

const isCalcable = (product) => (product && product.price && product.quantity)

const isCallback = (cb) => cb && typeof cb === Function

export { list, get, add, remove, update, total, destroy, exists, subtotal };
