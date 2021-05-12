import { form } from './form';

export const overlay = {
    open() {
        document.querySelector('.overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        form.clearFields();
    },
    close() {
        document.querySelector('.overlay').classList.remove('active');
        document.body.style.overflow = 'visible';
    },
};

export const sideBar = {
    divMenu: document.querySelector('div.menu'),
    sideBarElement: document.querySelector('.sideBar'),
    menu: document.querySelector('.menu'),
    openClose() {
        this.divMenu.classList.toggle('active');
        this.sideBarElement.classList.toggle('active');
        this.menu.classList.toggle('fixed');
    }
};