import { calculator } from './calculator';
import { cards } from './cards';
import { overlay } from './overlay';

export const form = {
    productsQuantity: document.getElementById('productsQuantity'),
    products: document.getElementById('products'),
    catchValues() {
        const productsQuantity = Number(this.productsQuantity.value);
        const products = Number(this.products.value);
        return { productsQuantity, products };
    },
    checkFields() {
        if (
            this.catchValues().products === '' ||
            this.catchValues().products == 0 ||
            this.catchValues().productsQuantity === '' ||
            this.catchValues().productsQuantity <= 0
        ) {
            throw Error;
        }
    },
    clearFields() {
        this.products.value = '';
        this.productsQuantity.value = '';
        document.querySelector('.divImage').innerHTML = '';
        document.querySelector('.quantity').innerHTML = '0 unidades';
        document.querySelector('.cost').innerHTML = 'Custo: R$ 0,00';
    },
    initCards() {
        document.querySelector('.sectionCards').innerHTML = '';
        cards.array.forEach((index) => {
            cards.createDiv(index);
        });
        document.querySelectorAll('.delete').forEach((element, index) => {
            element.addEventListener('click', () => {
                cards.deleteOne(index);
            });
        });
    },
    fixScroll() {
        const { length } = cards.array;
        if (length >= 3) {
            document.body.style.overflow = 'hidden';
        }
    },
    submit(event) {
        event.preventDefault();
        try {
            const values = this.catchValues();
            this.checkFields();
            cards.array.push(values);
            calculator.updateBalance();
            cards.removeOn();
            form.initCards();
            overlay.close();
        } catch (error) {
            setTimeout(() => {
                if (this.catchValues().products == 0) {
                    this.products.setAttribute(
                        'style',
                        'box-shadow: 0 0 6px #ee2828;',
                    );
                }
                if (this.catchValues().products == 0) {
                    this.productsQuantity.setAttribute(
                        'style',
                        'box-shadow: 0 0 6px #ee2828;',
                    );
                }
                const div = document.body.appendChild(
                    document.createElement('div'),
                );
                div.appendChild(document.createElement('div'))
                    .innerHTML = 'Por favor insira valores válidos nos campos';
                div.className = 'errorMenssage';
                setTimeout(() => {
                    div.classList.add('on');
                }, 100);
            }, 100);
            setTimeout(() => {
                document.querySelector('.errorMenssage').classList.remove('on');
                setTimeout(() => {
                    document.querySelector('.errorMenssage').remove();
                }, 1000);
                this.products.setAttribute('style', 'box-shadow: none;');
                this.productsQuantity.setAttribute(
                    'style',
                    'box-shadow: none;',
                );
            }, 4000);
        }
    },
};