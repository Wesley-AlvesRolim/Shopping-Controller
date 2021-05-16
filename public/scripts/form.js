import { calculator } from './calculator';
import { cartArray } from './cart';
import { overlay } from './overlay';

export const form = {
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
    submit(event, obj) {
        event.preventDefault();
        try {
            const values = {...this.catchValues(), ...obj };
            this.checkFields();
            cartArray.push(values);
            calculator.updateBalance();
            overlay.close();
        } catch (error) {

            this.productsQuantity.style.boxShadow = '0 0 6px #ee2828';

            setTimeout(() => {
                const div = document.body.appendChild(document.createElement('div'));
                div.appendChild(document.createElement('div')).innerHTML = 'Por favor insira valores válidos nos campos';
                div.className = 'errorMenssage';
                setTimeout(() => { div.classList.add('on'); }, 100);
            }, 100);

            this.productsQuantity.addEventListener('focus', () => {
                this.productsQuantity.style.boxShadow = 'none';
            });

            setTimeout(() => {
                document.querySelector('.errorMenssage').classList.remove('on');
                setTimeout(() => {
                    document.querySelector('.errorMenssage').remove();
                }, 1000);
            }, 4000);
        }
    },
};