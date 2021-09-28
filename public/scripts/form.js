import { calculator } from './calculator';
import { cartArray, initCards } from './cart';
import { overlay } from './overlay';
import { decreaseStock } from './utils';

export const form = {
    form: document.querySelector('.form-overlay__form'),
    productsQuantity: document.getElementById('productsQuantity'),

    catchValues() {
        return { productsQuantity: Number(this.productsQuantity.value) };
    },

    checkFields() {
        if (
            this.catchValues().productsQuantity === '' ||
            this.catchValues().productsQuantity <= 0
        ) {
            throw Error;
        }
    },
    clearFields() {
        this.productsQuantity.value = '';
        document.querySelector('.form-overlay__form__img').innerHTML = '';
        document.querySelector('.form-overlay__form__calculation__quantity').innerHTML = '0 unidades';
        document.querySelector('.form-overlay__form__calculation__cost').innerHTML = 'Custo: R$ 0,00';
    },

    pushToCart(values) {
        let [productAlreadyExist, indexInCart] = [false, -1];
        cartArray.forEach(({ productName }, index) => {
            if (productName === values.productName) {
                productAlreadyExist = true;
                indexInCart = index;
            }
        });

        if (productAlreadyExist) {
            const productBought = cartArray[indexInCart];
            productBought.productsQuantity += values.productsQuantity;
            return;
        }
        cartArray.push(values);
    },

    submit(obj) {
        try {
            const values = { ...this.catchValues(), ...obj };
            this.checkFields();
            this.pushToCart(values);
            calculator.updateBalance();
            initCards();
            overlay.close('form');
            decreaseStock(obj, values.productsQuantity);
        } catch (error) {
            console.error(error);
            const screenHeight = window.screen.height;
            const scrollY = window.scrollY;

            this.productsQuantity.style.boxShadow = '0 0 6px #ee2828';
            setTimeout(() => {
                const div = document.body.appendChild(document.createElement('div'));
                div.appendChild(document.createElement('div')).innerHTML = 'Por favor insira valores válidos no campo';
                div.className = 'errorMenssage';
                div.style.top = ((screenHeight * 0.25) + scrollY) + 'px';
                setTimeout(() => { div.classList.add('on'); }, 100);
            }, 100);

            this.productsQuantity.addEventListener('focus', () => {
                this.productsQuantity.style.boxShadow = 'none';
            });

            setTimeout(() => {
                document.querySelector('.errorMenssage').classList.remove('on');
                setTimeout(() => {
                    document.querySelector('.errorMenssage').remove();
                    this.productsQuantity.style.boxShadow = 'none';
                }, 1000);
            }, 4000);
        }
    },
};