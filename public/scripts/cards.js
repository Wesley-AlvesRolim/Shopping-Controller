import { calculator } from './calculator';
import { form } from './form';
import { utils } from './utils';

export const cards = {
    array: [],
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
        const sectionCards = document.querySelector('.sectionCards');
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