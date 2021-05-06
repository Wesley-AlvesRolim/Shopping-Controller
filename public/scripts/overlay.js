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