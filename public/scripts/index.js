import { overlay, sideBar } from './overlay';
import { cards } from './cards';
import { form } from './form';
import { products } from './data';
import { openedForm } from './openedForm';
import { initCards } from './cart';

let obj;


document.querySelector('.cartIcon').addEventListener('click', () => {
    document.querySelector('.overlayCart').classList.add('active');
    document.body.style.overflow = 'hidden';

    document.querySelector('#closeWindow').addEventListener('click', () => {
        document.querySelector('.overlayCart').classList.remove('active');
        document.body.style.overflow = 'visible';
    });
    initCards();
});

document.querySelector('div.menu').addEventListener('click', () => {
    sideBar.openClose();
});

document.querySelector('.actions').addEventListener('click', e => {
    if (e.target.tagName === 'A') overlay.close();
});

(function loadCards() {
    document.querySelector('.sectionCards').innerHTML = '';
    products.forEach(index => { cards.createDiv(index); });

    document.querySelectorAll('.card').forEach((element, index) => {
        const { value, image } = products[index];
        element.addEventListener('click', () => {
            overlay.open();
            openedForm(value, image);
            obj = products[index];
        });
    });
})();

document.querySelector('form').addEventListener('submit', e => {
    form.submit(e, obj);
});

window.onload = setInterval(() => {
    document
        .querySelector('.brandIcon1')
        .setAttribute(
            'style',
            ';top: -770px;opacity: 0; visibility: hidden;transition: .5s;'
        );
    document
        .querySelector('.brandIcon2')
        .setAttribute(
            'style',
            'top: 0;opacity: 1; visibility: visible;transition: .5s;'
        );
    setTimeout(() => {
        document
            .querySelector('.brandIcon1')
            .setAttribute(
                'style',
                ';top: 0;opacity: 1; visibility: visible;transition: .5s;'
            );
        document
            .querySelector('.brandIcon2')
            .setAttribute(
                'style',
                'top: -770px;opacity: 0; visibility: hidden;transition: .5s;'
            );
    }, 4000);
}, 8000);