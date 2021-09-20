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
}

function showStockNumber(stock) {
    const input = document.querySelector('input[type="number"]');
    let p = document.querySelector('.stock');
    if (!p) p = document.createElement('p');
    p.className = 'stock';
    p.innerText = 'Estoque: ' + stock;
    input.parentElement.insertAdjacentElement('afterend', p);
}

function createImg(productName) {
    const divImage = document.querySelector('.form-overlay__form__img');
    const img = document.createElement('img');
    divImage.appendChild(img);

    img.className = 'img';
    img.src = '/public/images/' + productName + '.jpg';
}

function focus(value, stock) {
    document.querySelector('input[type="number"]').addEventListener('focus', () => {
        form.productsQuantity.oninput = function () {
            if (form.catchValues().productsQuantity >= stock) Number(form.productsQuantity.value = stock);
            changingHTMLValues(value, stock);
        };
    });
}

function changingHTMLValues(value, stock) {
    const cost = document.querySelector('.form-overlay__form__calculation__cost');
    const quantity = document.querySelector('.form-overlay__form__calculation__quantity');
    const stockElement = document.querySelector('.stock');
    const { productsQuantity } = form.catchValues();

    const checkName = productsQuantity > 1 ? ' Unidades' : ' Unidade';
    const costValue = value * productsQuantity;
    const stockQuantity = stock - productsQuantity;

    if (productsQuantity <= 0) {
        cost.innerHTML = 'Custo: ' + utils.formatPrice(costValue);
        quantity.innerHTML = 0 + checkName;
        stockElement.innerHTML = 'Estoque: ' + stock;
        return;
    }
    cost.innerHTML = 'Custo: ' + utils.formatPrice(costValue);
    quantity.innerHTML = productsQuantity + checkName;
    stockElement.innerHTML = 'Estoque: ' + stockQuantity;
}

function setDefaultValue(value, stock) {
    const productsQuantity = form.productsQuantity;
    productsQuantity.value = 1;
    changingHTMLValues(value, stock);
}

function moreLessButtons(value, stock) {
    const more = document.querySelector('.form-overlay .more');
    const less = document.querySelector('.form-overlay .less');
    const productsQuantity = form.productsQuantity;
    more.onclick = function () {
        if (productsQuantity.value >= stock) return;
        productsQuantity.value = Number(productsQuantity.value) + 1;
        changingHTMLValues(value, stock);
    };
    less.onclick = function () {
        if (productsQuantity.value <= 0) return;
        productsQuantity.value = Number(productsQuantity.value) - 1;
        changingHTMLValues(value, stock);
        if (productsQuantity.value < 1) overlay.close('form');
    };
}