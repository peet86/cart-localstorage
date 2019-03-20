const STORAGE_KEY = '__cart'

export const get = (key) => JSON.parse(localStorage.getItem(key || STORAGE_KEY)) || [];

export const save = (data, key) => localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));

export const clear = () => localStorage.removeItem(STORAGE_KEY)
