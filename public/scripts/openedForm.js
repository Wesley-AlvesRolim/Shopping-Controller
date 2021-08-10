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
}

function createImg(productName) {
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

function focus(value, stock = 100) {
    const cost = document.querySelector('.form-overlay__form__calculation__cost');
    const quantity = document.querySelector('.form-overlay__form__calculation__quantity');

    document.querySelector('input[type="number"]').addEventListener('focus', () => {
        form.productsQuantity.oninput = function() {
            if (form.catchValues().productsQuantity >= stock) Number(form.productsQuantity.value = stock);

            const checkName = form.catchValues().productsQuantity > 1 ? ' Unidades' : ' Unidade';
            const costValue = value * form.catchValues().productsQuantity;

            if (form.catchValues().productsQuantity <= 0) {
                cost.innerHTML = 'Custo: ' + utils.formatPrice(costValue);
                quantity.innerHTML = 0 + checkName;
                return;
            }
            cost.innerHTML = 'Custo: ' + utils.formatPrice(costValue);
            quantity.innerHTML = form.catchValues().productsQuantity + checkName;
        };
    });
}