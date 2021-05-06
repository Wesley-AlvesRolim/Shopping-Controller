import { cards } from './cards';
import { utils } from './utils';

export const calculator = {
    countingProducts: document.querySelector('.countingProducts'),
    totalHtml: document.querySelector('.total'),
    sumQuantity() {
        let quantity = 0;
        cards.array.forEach((position) => {
            const sum = position.productsQuantity;
            quantity += sum;
        });
        return quantity;
    },
    sumPrice() {
        let initialPrice = 0;
        cards.array.forEach((position) => {
            const sum = position.productsQuantity;
            const price = position.products;
            initialPrice += price * sum;
        });
        return initialPrice;
    },
    updateBalance() {
        const sum = this.sumQuantity();
        const price = calculator.sumPrice();
        this.countingProducts.innerHTML = `${sum} produtos`;
        this.totalHtml.innerHTML = `Total: ${utils.formatPrice(price)}`;
    },
};