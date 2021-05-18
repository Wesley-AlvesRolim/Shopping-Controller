import { overlay } from './overlay';
import { cards } from './cards';
import { form } from './form';
import { products } from './data';
import { openedForm } from './openedForm';
import { initCards } from './cart';

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

document.querySelector('.form-overlay__form__actions').addEventListener('click', e => {
    if (e.target.tagName === 'A') overlay.close('form');
});

(function loadCards() {
    document.querySelector('.section-cards').innerHTML = '';
    products.forEach(index => { cards.createDiv(index); });

    document.querySelectorAll('.card').forEach((element, index) => {
        const { value, image } = products[index];
        element.addEventListener('click', () => {
            overlay.open('form');
            openedForm(value, image);
            obj = products[index];
        });
    });
})();

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    form.submit(obj);
});