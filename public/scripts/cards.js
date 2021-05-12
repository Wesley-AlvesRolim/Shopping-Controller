import { calculator } from './calculator';
import { form } from './form';
import { utils } from './utils';

export const cards = {
    array: [],
    deleteOne(index) {
        cards.array.splice(index, 1);
        calculator.updateBalance();
        form.initCards();
    },
    deleteAll() {
        calculator.countingProducts.innerHTML = `${0} produtos`;
        calculator.totalHtml.innerHTML = `Total: ${utils.formatPrice(0)}`;
        cartArray.splice(0);
        initCards();
    },
    createDiv(index) {
        const sectionCards = document.querySelector('.sectionCards');
        const div = document.createElement('div');
        sectionCards.removeAttribute('style');
        sectionCards.appendChild(div);
        div.classList.add('card');
        div.innerHTML = cards.innerHtml(index);
    },
    innerHtml(index) {
        const argumentForOnClick = cards.array.indexOf(index);
        const { productsName } = this.searchProductName(index.products);
        const productImage = this.searchProductName(index.products).image;
        const checkName = index.productsQuantity > 1 ? 'unidades' : 'unidade';
        const content = `
            <a href="#" class="delete ${argumentForOnClick}">
                <img src = "./assets/trash.svg" alt = "Trash" class= "trash" >
            </a >
            <img src="${productImage}" alt="${productsName}">
            <p>${productsName}</p>
            <p>${index.productsQuantity} ${checkName} por ${utils.formatPrice(
    index.products * index.productsQuantity,
)}</p>`;
        return content;
    },
    searchProductName(price) {
        let productsName;
        let image;
        switch (price) {
            case 1151.1:
                productsName = 'Moto G9 Play';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1962217/0/1962217075_1SZ.jpg';
                break;
            case 10377.93:
                productsName = 'Smart TV OLED 65\'\' LG';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1735043/1/1735043183_1SZ.jpg';
                break;
            case 4699.99:
                productsName = 'Lenovo Ideapad L340';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/2430049/7/2430049779_1SZ.jpg';
                break;
            case 87.3:
                productsName = 'CyberPunk 2077-PS4';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1466225/4/1466225463_1SZ.jpg';
                break;
            case 264.48:
                productsName = 'SSD 240gb Plus - Sandisk';
                image = 'https://images-submarino.b2w.io/produtos/01/00/images/134409/7/134409750P1.jpg';
                break;
            case 1265.25:
                productsName = 'Monitor LED 25\'\' Gamer LG';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1729775/6/1729775687_4GG.jpg';
                break;
            case 3403.08:
                productsName = 'Xbox Series S';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/2117190/5/2117190565P1.jpg';
                break;
            case 598.5:
                productsName = 'Micro-ondas Consul';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img7/01/00/item/116796/3/116796362_5GG.jpg';
                break;
            case 439.99:
                productsName = 'Fritadeira Sem Óleo Oster';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1481124/3/1481124311P1.jpg';
                break;
            case 239.99:
                productsName = 'Liquidificador Philips';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/134532/8/134532811_4GG.jpg';
                break;
            case 2922.99:
                productsName = 'Playstation 4 + 3 Games';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/2317562/0/2317562028P1.jpg';
                break;
            case 159.6:
                productsName = 'Mouse Gamer Redragon Chroma';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/46419/3/46419319_3GG.jpg';
                break;
            case 339:
                productsName = 'Teclado Gamer HyperX Alloy Core';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/98025/6/98025652_1SZ.jpg';
                break;
            case 279.99:
                productsName = 'Headset Gamer Havit H2015d';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1809794/0/1809794044_1SZ.jpg';
                break;
            case 235.83:
                productsName = 'The Last Of Us Part II - PS4';
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1459449/0/1459449098_1SZ.jpg';
                break;
        }
        return { productsName, image };
    },
};