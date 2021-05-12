import { overlay, sideBar } from './overlay';
import { cards } from './cards';
import { utils } from './utils';
import { form } from './form';


document.querySelector('div.menu').addEventListener('click', () => {
    sideBar.openClose();
});

document.querySelector('.cartIcon').addEventListener('click', () => {
    document.querySelector('.overlayCart').classList.add('active');
    document.body.style.overflow = 'hidden';

document.querySelector('.addButton').addEventListener('click', () => {
    overlay.open();
});

document.querySelector('.removeButton').addEventListener('click', () => {
    cards.deleteAll();
});


document.querySelector('.actions').addEventListener('click', e => {
    if (e.target.tagName === 'A') overlay.close();
});

const label = document.querySelectorAll('label');
label.forEach(element => {
    element.nextElementSibling.addEventListener('focus', () => {
        focusEvent();
    });
});

document.querySelector('form').addEventListener('submit', e => {
    form.submit(e);
});


const focusEvent = () => {
    const cost = document.querySelector('.cost');
    const quantity = document.querySelector('.quantity');

    form.productsQuantity.oninput = function () {
        if (form.catchValues().productsQuantity >= 1000000) Number(form.productsQuantity.value = form.catchValues().productsQuantity.toString().slice(0, -1));
        const checkName =
            form.catchValues().productsQuantity > 1 ? ' Unidades' : ' Unidade';
        if (form.catchValues().productsQuantity <= 0) {
            const value =
                form.catchValues().products * form.catchValues().productsQuantity;
            cost.innerHTML =
                'Custo: ' + utils.formatPrice(value);
            quantity.innerHTML = 0 + checkName;
        } else {
            const value = form.catchValues().products * form.catchValues().productsQuantity;
            cost.innerHTML = 'Custo: ' + utils.formatPrice(value);
            quantity.innerHTML = form.catchValues().productsQuantity + checkName;
        }
    };
    form.products.oninput = function () {
        if (form.catchValues().productsQuantity <= 0) {
            cost.innerHTML = `Custo: ${utils.formatPrice(0)}`;
        } else {
            const value =
                form.catchValues().products *
                form.catchValues().productsQuantity;
            cost.innerHTML = 'Custo: ' + utils.formatPrice(value);
        }

        const divImage = document.querySelector('.divImage');
        divImage.innerHTML = '';
        const img = document.createElement('img');
        divImage.appendChild(img);

        img.classList.add('img');
        img.setAttribute(
            'src',
            cards.searchProductName(form.catchValues().products).image
        );
    };
};

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
