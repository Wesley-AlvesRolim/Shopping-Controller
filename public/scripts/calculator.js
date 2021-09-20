import { cartArray } from './cart';
import { utils } from './utils';

export const calculator = {
    countingProducts: document.querySelector('.counting-products'),
    totalHtml: document.querySelector('.total'),
    sumQuantity() {
        let quantity = 0;
        cartArray.forEach((position) => {
            const sum = position.productsQuantity;
            quantity += sum;
        });
        return quantity;
    },
    sumPrice() {
        let initialPrice = 0;
        cartArray.forEach((position) => {
            const sum = position.productsQuantity;
            const price = position.value;
            initialPrice += price * sum;
        });
        return initialPrice;
    },
    updateBalance() {
        const sum = this.sumQuantity();
        const price = this.sumPrice();
        this.countingProducts.innerHTML = `${sum} produtos`;
        this.totalHtml.innerHTML = `Total: ${utils.formatPrice(price)}`;
    },
};