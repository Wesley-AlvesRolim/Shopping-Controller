import { overlay } from './overlay';
import { cards } from './cards';
import { form } from './form';
import { products } from './data';
import { openedForm } from './openedForm';
import { initCards } from './cart';
import { listeningEventsToDarkTheme } from './dark-theme';

let obj;
document.querySelector('.header__cart').addEventListener('click', () => {
    overlay.open('cart');
    document.querySelector('.close-window-icon').addEventListener('click', () => {
        overlay.close('cart');
    });
    initCards();
});

document.querySelector('.header__menu').addEventListener('click', () => {
    overlay.openClose();
});

document.querySelector('.form-overlay__form__header img').addEventListener('click', e => {
    overlay.close('form');
});

(function loadCards() {
    document.querySelector('.section-cards').innerHTML = '';
    products.forEach((element, index) => { cards.createDiv(element, index); });

    document.querySelectorAll('.card').forEach((element, index) => {
        element.addEventListener('click', () => {
            obj = products[index];
            openedForm(obj);
        });
    });
})();

listeningEventsToDarkTheme();

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    form.submit(obj);
});