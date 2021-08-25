export function readLocalStorage(name) {
    return localStorage.getItem(name);
};

export function updateLocalStorage(name, value) {
    localStorage.setItem(name, value)
}
