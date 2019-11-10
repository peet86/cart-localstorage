const STORAGE_KEY = '__cart'

let saveListener = null;
export const listen = (cb) => { saveListener = cb }; // ugly but storage listener is not working for the same window..

export const list = (key) => JSON.parse(localStorage.getItem(key || STORAGE_KEY)) || [];

export const save = (data, key) => {
	localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));
	if(saveListener) saveListener(list(key || STORAGE_KEY))
}

export const clear = (key) => {
	localStorage.removeItem(key || STORAGE_KEY)
	if(saveListener) saveListener(list(key || STORAGE_KEY))
}
