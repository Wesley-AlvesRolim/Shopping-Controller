import { calculator } from './calculator';
import { cartArray, initCards } from './cart';
import { utils } from './utils';

export const cards = {
    deleteOne(index) {
        cartArray.splice(index, 1);
        calculator.updateBalance();
        initCards();
    },
    deleteAll() {
        calculator.countingProducts.innerHTML = `${0} produtos`;
        calculator.totalHtml.innerHTML = `Total: ${utils.formatPrice(0)}`;
        cartArray.splice(0);
        initCards();
    },
    createDiv(element, index) {
        const sectionCards = document.querySelector('.section-cards');
        const div = document.createElement('div');
        sectionCards.removeAttribute('style');
        sectionCards.appendChild(div);
        div.classList.add('card');
        div.style = '--x:' + (index * .2) + 's';
        div.innerHTML = innerHtml(element);
    },
    stockZero(position) {
        const cardProduct = document.querySelector('.section-cards .card:nth-child(' + (position + 1) + ')');
        cardProduct.classList.add('empty');
    },
    stockExist(position) {
        const cardProduct = document.querySelector('.section-cards .card:nth-child(' + (position +  1) + ')');
        cardProduct.classList.remove('empty');
    }
};

function innerHtml(index) {
    const { productName, value } = index;
    const content = `
        <img src="./images/${productName}.jpg" alt="${productName}">
        <p>${productName}</p>
        <p>${utils.formatPrice(value)}</p>`;
    return content;
}
