const STORAGE_KEY = '__cart'

let saveListener = null;
export const listen = (cb) => { saveListener = cb }; // ugly but storage listener is not working for the same window..

export const get = (key) => JSON.parse(localStorage.getItem(key || STORAGE_KEY)) || [];

export const save = (data, key) => {
	localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));
	if(saveListener) saveListener(get(key || STORAGE_KEY))
}

export const clear = () => {
	localStorage.removeItem(STORAGE_KEY)
	if(saveListener) saveListener(get(key || STORAGE_KEY))
}
