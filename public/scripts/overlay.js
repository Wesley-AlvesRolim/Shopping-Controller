import { form } from './form';

export const overlay = {
    form: document.querySelector('.form-overlay'),
    formConfirmDelete: document.querySelector('.form-overlay-confirm-delete'),
    cart: document.querySelector('.cart-overlay'),
    sideBar: document.querySelector('.overlay-side-bar'),
    menu: document.querySelector('.header__menu'),
    body: document.querySelector('body'),
    open(element) {
        if (element === 'form') form.clearFields();
        this[element].classList.add('active');
    },
    close(element) {
        this[element].classList.remove('active');
    },
    openClose() {
        this.body.classList.toggle('menu--active');
        this.menu.classList.toggle('active');
        this.sideBar.classList.toggle('active');
    },
};