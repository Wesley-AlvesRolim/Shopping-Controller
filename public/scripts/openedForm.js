import { form } from './form';
import { products } from './data';
import { utils } from './utils';
import { overlay } from './overlay';

export function openedForm(obj) {
    const selectedProduct = products.indexOf(obj);
    const { value, productName, stock } = products[selectedProduct];
    const cost = document.querySelector('.form-overlay__form__calculation__cost');
    cost.innerHTML = `Custo: ${utils.formatPrice(0)}`;

    if (stock <= 0) return;

    overlay.open('form');
    createImg(productName);
    showStockNumber(stock);
    focus(value, stock);
    moreLessButtons(value, stock);
    setDefaultValue(value, stock);
}

export function showStockNumber(stock, htmlId = '') {
    const input = document.querySelector('input[type="number"]' + htmlId);
    let p = document.querySelector('.stock');
    if (!p) p = document.createElement('p');

    p.className = 'stock';
    p.innerText = 'Estoque: ' + stock;
    input.parentElement.insertAdjacentElement('afterend', p);
}

export function createImg(productName, classToHtml = '') {
    const divImage = document.querySelector('.form-overlay' + classToHtml + '__form__img');
    const img = document.createElement('img');
    divImage.innerHTML = '';
    divImage.appendChild(img);

    img.className = 'img';
    img.src = './images/' + productName + '.jpg';
}

function focus(value, stock) {
    document.querySelector('.form-overlay__form input[type="number"]').addEventListener('focus', () => {
        form.productsQuantity.oninput = function () {
            if (form.catchValues().productsQuantity >= stock) Number(form.productsQuantity.value = stock);
            changingHTMLValues(value, stock);
        };
    });
}

export function changingHTMLValues(value, stock, classToHtml = '', productsQuantityInCart) {
    const cost = document.querySelector('.form-overlay' + classToHtml + '__form__calculation__cost');
    const quantity = document.querySelector('.form-overlay' + classToHtml + '__form__calculation__quantity');
    const stockElement = document.querySelector('.form-overlay' + classToHtml + '__form .stock');

    let { productsQuantity } = form.catchValues();
    productsQuantity = classToHtml === '' ? productsQuantity : Number(document.querySelector('#productsQuantityToRemove').value);

    const checkName = productsQuantity > 1 ? ' Unidades' : ' Unidade';
    const costValue = value * productsQuantity;
    const stockQuantity = classToHtml === '' ? stock - productsQuantity : stock + productsQuantity;

    if (productsQuantity <= 0) {
        if (cost && quantity) {
            cost.innerHTML = 'Custo: ' + utils.formatPrice(costValue);
            quantity.innerHTML = 0 + checkName;
        }
        stockElement.innerHTML = 'Estoque: ' + stock;
        return;
    }
    if(productsQuantity > productsQuantityInCart) return;
    if (cost && quantity) {
        cost.innerHTML = 'Custo: ' + utils.formatPrice(costValue);
        quantity.innerHTML = productsQuantity + checkName;
    }
    stockElement.innerHTML = 'Estoque: ' + stockQuantity;
}

export function setDefaultValue(value, stock, htmlId = 'nothingHere', productsQuantityInCart) {
    const htmlClass = htmlId !== 'nothingHere' ? '-confirm-delete' : '';
    const productsQuantity = document.querySelector(htmlId) || form.productsQuantity;
    productsQuantity.value = 1;
    changingHTMLValues(value, stock, htmlClass, productsQuantityInCart);
}

export function moreLessButtons(value, stock, classToHtml = '', htmlId = 'nothingHere', productsQuantityInCart) {
    const more = document.querySelector('.form-overlay' + classToHtml + ' .more');
    const less = document.querySelector('.form-overlay' + classToHtml + ' .less');
    const productsQuantity = document.querySelector(htmlId) || form.productsQuantity;

    more.onclick = function () {
        const conditional = classToHtml === '' ? Number(productsQuantity.value) >= stock : productsQuantity.value >= productsQuantityInCart;
        if (conditional) return;
        productsQuantity.value = Number(productsQuantity.value) + 1;
        changingHTMLValues(value, stock, classToHtml, productsQuantityInCart);
    };
    less.onclick = function () {
        if (Number(productsQuantity.value) <= 0) return;
        productsQuantity.value = Number(productsQuantity.value) - 1;
        changingHTMLValues(value, stock, classToHtml, productsQuantityInCart);
        if (productsQuantity.value < 1) overlay.close(classToHtml !== '' ? 'formConfirmDelete' :'form');
    };
}