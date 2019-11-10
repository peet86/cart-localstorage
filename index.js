import { get as getStorage, save as saveStorage, clear as clearStorage, listen as listenStorage } from './utils/localstorage'

const list = () => getStorage();

const get = (id) => getStorage().find((product) => product.id === id)

const exists = (id) => !!get(id)

const add = (product, quantity) => isValid(product) ? exists(product.id) ? update(product.id, 'quantity', get(product.id).quantity + (quantity || 1)) : saveStorage(getStorage().concat({ ...product, quantity: quantity || 1 })) : null;

const remove = (id) => saveStorage(getStorage().filter((product) => product.id !== id))

const quantity = (id, diff) => exists(id) && get(id).quantity + diff >= 0 ? update(id, 'quantity', get(id).quantity + diff) : remove(id);

const update = (id, field, value) => saveStorage(getStorage().map((product) => product.id === id ? ({ ...product, [field]: value }) : product))

const total = (cb) => getStorage().reduce((sum, product) => isCallback(cb) ? cb(sum, product) : (sum += subtotal(product)), 0);

const destroy = () => clearStorage()

const onChange = (cb) => isCallback(cb) ? listenStorage(cb) : console.log(typeof cb)


const isValid = (product) => product.id && product.price

const subtotal = (product) => isCalcable(product) ? (product.price * product.quantity) : 0

const isCalcable = (product) => (product && product.price && product.quantity)

const isCallback = (cb) => cb && typeof cb === "function"

export { list, get, add, remove, update, quantity, total, destroy, exists, subtotal, onChange };
