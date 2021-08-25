import { cards } from './cards';
import { products } from './data';
import { utils, increaseStock } from './utils';

export const cartArray = [];
export function initCards() {
    const cart = document.querySelector('.cart-overlay__content__cart');
    addingBall();
    messageInCartContent(cart);
    addingCards(cart);
    listeningDelete();
}

function addingCards(cart) {
    cartArray.forEach((element, index) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = innerHtml(element);
        div.style = '--x:' + (index * .2) + 's';
        cart.appendChild(div);
    });
}

function addingBall() {
    const cart = document.querySelector('.header__cart');
    if (cartArray.length > 0) {
        cart.classList.add('filled');
        return;
    }
    cart.classList.remove('filled');
}

function messageInCartContent(cart) {
    cart.innerHTML = '';
    if (cartArray.length === 0) {
        cart.innerHTML = 'Suas compras estarão aqui no futuro!';
        cart.classList.add('empty');
        return;
    }
    cart.classList.remove('empty');
}

function listeningDelete() {
    document.querySelectorAll('.delete').forEach((element, index) => {
        element.addEventListener('click', () => {
            const productInCart = cartArray[index];
            const productNameInCart = productInCart.productName;

            products.forEach((product, index) => {
                if (product.productName === productNameInCart) increaseStock(productInCart, index);
            });
            cards.deleteOne(index);
        });
    });
}

function innerHtml(index) {
    const { productName, value, productsQuantity } = index;
    const checkName = productsQuantity > 1 ? 'unidades' : 'unidade';
    const content = `
            <a href="#" class="delete">
                <?xml version="1.0" encoding="UTF-8"?>
                <svg version="1.1" viewBox="0 -256 1792 1792" xmlns="http://www.w3.org/2000/svg" class= "trash">
                    <g transform="matrix(1 0 0 -1 197.42 1255.1)">
                        <path d="m512 800v-576q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v576q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-576q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v576q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-576q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v576q0 14 9 23t23 9h64q14 0 23-9t9-23zm128-724v948h-896v-948q0-22 7-40.5t14.5-27 10.5-8.5h832q3 0 10.5 8.5t14.5 27 7 40.5zm-672 1076h448l-48 117q-7 9-17 11h-317q-10-2-17-11zm928-32v-64q0-14-9-23t-23-9h-96v-948q0-83-47-143.5t-113-60.5h-832q-66 0-113 58.5t-47 141.5v952h-96q-14 0-23 9t-9 23v64q0 14 9 23t23 9h309l70 167q15 37 54 63t79 26h320q40 0 79-26t54-63l70-167h309q14 0 23-9t9-23z" fill="currentColor"/>
                    </g>
                </svg>
            </a>
            <img src="./public/images/${productName}.jpg" alt="${productName}">
            <p>${productName}</p>
            <p>${productsQuantity} ${checkName} por ${utils.formatPrice(value * productsQuantity,)}</p>`;
    return content;
}