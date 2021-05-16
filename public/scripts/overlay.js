import { form } from './form';

export const overlay = {
    open() {
        document.querySelector('.form-overlay').classList.add('active');
        form.clearFields();
    },
    close() {
        document.querySelector('.form-overlay').classList.remove('active');
    },
};

export const sideBar = {
    sideBarElement: document.querySelector('.overlay-side-bar'),
    menu: document.querySelector('.header__menu'),
    openClose() {
        this.menu.classList.toggle('active');
        this.menu.classList.toggle('fixed');
        this.sideBarElement.classList.toggle('active');
    }
};
export const cart = {
    cartOverlay: document.querySelector('.cart-overlay'),
    open() {
        this.cartOverlay.classList.add('active');
    },
    close() {
        this.cartOverlay.classList.remove('active');
    }
};