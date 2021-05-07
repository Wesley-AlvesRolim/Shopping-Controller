import { form } from './form';

export const overlay = {
    open() {
        document.querySelector('.overlay').removeAttribute('hidden');
        form.clearFields();
        form.fixScroll();
    },
    close() {
        document.querySelector('.overlay').setAttribute('hidden', '');
        document.body.style.overflow = 'visible';
    },
};

export const sideBar = {
    divMenu: document.querySelector('div.menu'),
    sideBarElement: document.querySelector('.sideBar'),
    openClose() {
        this.divMenu.classList.toggle('active');
        this.sideBarElement.classList.toggle('active');
    }
};
