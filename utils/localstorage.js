const STORAGE_KEY = '__cart'

export const get = (key) => JSON.parse(localStorage.getItem(key || STORAGE_KEY)) || [];

export const save = (data, key) => localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));

export const clear = () => localStorage.removeItem(STORAGE_KEY)

export const listen = (cb) => window.addEventListener('storage', (event) =>  (event.key === STORAGE_KEY) ? cb(get(STORAGE_KEY)) : false)

