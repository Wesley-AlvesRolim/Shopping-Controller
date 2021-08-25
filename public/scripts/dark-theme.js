import { readLocalStorage, updateLocalStorage } from "./local-storage";

const body = document.querySelector('body');
const toggle = document.querySelector('.choose-theme__toggle')
const checkbox = document.querySelector('#theme')

function checkingLocalStorageFirst() {
    const readValue = readLocalStorage('theme');
    switch (readValue) {
        case 'dark':
            darkThemeOnOrOff();
            break;

        default:
            updateLocalStorage('theme', 'light')
            break;
    }
};

function editingAccordingTheme() {
    const isDark = body.classList.contains('dark');
    if (isDark) updateLocalStorage('theme', 'dark');
    else updateLocalStorage('theme', 'light');
};

function darkThemeOnOrOff() {
    body.classList.toggle('dark');
    editingAccordingTheme();
};

export function listeningEventsToDarkTheme() {
    checkingLocalStorageFirst();
    toggle.addEventListener('click', () => {
        darkThemeOnOrOff();
    });

    checkbox.addEventListener('input', () => {
        darkThemeOnOrOff();
    });
}
