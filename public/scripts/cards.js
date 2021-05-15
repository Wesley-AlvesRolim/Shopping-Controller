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
    createDiv(index) {
        const sectionCards = document.querySelector('.section-cards');
        const div = document.createElement('div');
        sectionCards.removeAttribute('style');
        sectionCards.appendChild(div);
        div.classList.add('card');
        div.innerHTML = innerHtml(index);
    }
};

function innerHtml(index) {
    const { productName, value, image } = index;
    const content = `
        <img src="${image}" alt="${productName}">
        <p>${productName}</p>
        <p>${utils.formatPrice(value)}</p>`;
    return content;
}