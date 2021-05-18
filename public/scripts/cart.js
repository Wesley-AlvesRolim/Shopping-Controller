import { cards } from './cards';
import { utils } from './utils';

export const cartArray = [];
export function initCards() {
    const cart = document.querySelector('.cart-overlay__content__cart');
    addingBall();
    messageInCartContent(cart);
    addingCards(cart);
    listeningDelete();
}

function addingCards(cart) {
    cartArray.forEach(index => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = innerHtml(index);
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
            cards.deleteOne(index);
        });
    });
}

function innerHtml(index) {
    const { productName, value, image, productsQuantity } = index;
    const checkName = productsQuantity > 1 ? 'unidades' : 'unidade';
    const content = `
            <a href="#" class="delete">
                <img src = "./assets/trash.svg" alt = "Trash" class= "trash" >
            </a >
            <img src="${image}" alt="${productName}">
            <p>${productName}</p>
            <p>${productsQuantity} ${checkName} por ${utils.formatPrice(value * productsQuantity,)}</p>`;
    return content;
}