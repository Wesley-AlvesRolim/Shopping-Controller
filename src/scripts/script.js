const overlay = {
    open() {
        document.querySelector('.overlay').removeAttribute('hidden')
        form.clearFields()
        form.fixScroll()
    },
    close() {
        document.querySelector('.overlay').setAttribute('hidden', '')
        document.body.style.overflow = 'visible';
    }
}

const calculator = {
    countingProducts: document.querySelector('.countingProducts'),
    totalHtml: document.querySelector('.total'),
    sumQuantity() {
        let quantity = 0
        cards.array.forEach((position) => {
            const sum = position.productsQuantity
            quantity = quantity + sum
        })
        return quantity
    },
    sumPrice() {
        let initialPrice = 0
        cards.array.forEach((position) => {
            const sum = position.productsQuantity;
            const price = position.products;
            initialPrice = initialPrice + (price * sum)
        })
        return initialPrice
    },
    updateBalance() {
        const sum = this.sumQuantity()
        const price = calculator.sumPrice()
        this.countingProducts.innerHTML = `${sum} produtos`
        this.totalHtml.innerHTML = `Total: ${utils.formatPrice(price)}`
    }
}

const cards = {
    array: [],
    deleteOne(index) {
        cards.array.splice(index, index + 1)
        form.initCards()
        calculator.updateBalance()
    },
    deleteAll() {
        calculator.countingProducts.innerHTML = `${0} produtos`
        calculator.totalHtml.innerHTML = `Total: ${utils.formatPrice(0)}`
        cards.array.splice(0)
        form.initCards()
    },
    removeOn() {
        if (cards.array.length > 0) {
            document.querySelector('.removeOn').removeAttribute('style')
        } else {
            document.querySelector('.removeOn').setAttribute('style', 'opacity: 0; visibility: hidden;')
        }
    },
    createDiv(index) {
        const sectionCards = document.querySelector('.sectionCards')
        const div = document.createElement('div')
        sectionCards.removeAttribute('style')
        sectionCards.appendChild(div)
        div.classList.add('card')
        div.innerHTML = cards.innerHtml(index)
    },
    innerHtml(index) {
        const argumentForOnClick = cards.array.indexOf(index)
        const productsName = this.searchProductName(index.products).productsName
        const productImage = this.searchProductName(index.products).image
        const checkName = index.productsQuantity > 1 ? 'unidades' : 'unidade'
        const content = `
            <a href="#" onclick = "cards.deleteOne(${argumentForOnClick})">
                <img src = "./assets/trash.svg" alt = "Trash" class= "trash" >
            </a >
            <img src="${productImage}" alt="${productsName}">
            <p>${productsName}</p>
            <p>${index.productsQuantity} ${checkName} por ${utils.formatPrice(index.products * index.productsQuantity)}</p>`
        return content
    },
    searchProductName(price) {
        let productsName;
        let image;
        switch (price) {
            case 1151.1:
                productsName = 'Moto G9 Play'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1962217/0/1962217075_1SZ.jpg'
                break;
            case 10377.93:
                productsName = "Smart TV OLED 65'' LG"
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1735043/1/1735043183_1SZ.jpg'
                break;
            case 4699.99:
                productsName = 'Lenovo Ideapad L340'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/2430049/7/2430049779_1SZ.jpg'
                break;
            case 87.3:
                productsName = 'CyberPunk 2077-PS4'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1466225/4/1466225463_1SZ.jpg'
                break;
            case 264.48:
                productsName = 'SSD 240gb Plus - Sandisk'
                image = 'https://images-submarino.b2w.io/produtos/01/00/images/134409/7/134409750P1.jpg'
                break;
            case 1265.25:
                productsName = "Monitor LED 25'' Gamer LG"
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1729775/6/1729775687_4GG.jpg'
                break;
            case 3403.08:
                productsName = 'Xbox Series S'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/2117190/5/2117190565P1.jpg'
                break;
            case 598.50:
                productsName = 'Micro-ondas Consul'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img7/01/00/item/116796/3/116796362_5GG.jpg'
                break;
            case 439.99:
                productsName = 'Fritadeira Sem Óleo Oster'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1481124/3/1481124311P1.jpg'
                break;
            case 239.99:
                productsName = 'Liquidificador Philips'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/134532/8/134532811_4GG.jpg'
                break;
            case 2922.99:
                productsName = 'Playstation 4 + 3 Games'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/2317562/0/2317562028P1.jpg'
                break;
            case 159.6:
                productsName = 'Mouse Gamer Redragon Chroma'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/46419/3/46419319_3GG.jpg'
                break;
            case 339:
                productsName = 'Teclado Gamer HyperX Alloy Core'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/98025/6/98025652_1SZ.jpg'
                break;
            case 279.99:
                productsName = 'Headset Gamer Havit H2015d'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1809794/0/1809794044_1SZ.jpg'
                break;
            case 235.83:
                productsName = 'The Last Of Us Part II - PS4'
                image = 'https://images-submarino.b2w.io/produtos/01/00/img/1459449/0/1459449098_1SZ.jpg'
                break;
        }
        return { productsName, image }
    }
}

const utils = {
    formatPrice(value) {
        const converted = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return converted
    }
}
const focusEvent = () => {
    const cost = document.querySelector('.cost')
    const quantity = document.querySelector('.quantity')

    form.productsQuantity.oninput = function () {
        const checkName = form.catchValues().productsQuantity > 1 ? ' Unidades' : ' Unidade'
        if (form.catchValues().productsQuantity <= 0) {
            const value = form.catchValues().products * form.catchValues().productsQuantity
            cost.innerHTML = 'Custo: ' + utils.formatPrice(value)
            quantity.innerHTML = 0 + checkName
        } else {
            const value = form.catchValues().products * form.catchValues().productsQuantity
            cost.innerHTML = 'Custo: ' + utils.formatPrice(value)
            quantity.innerHTML = form.catchValues().productsQuantity + checkName
        }
    }
    form.products.oninput = function () {
        if (form.catchValues().productsQuantity <= 0) {
            cost.innerHTML = `Custo: ${utils.formatPrice(0)}`
        } else {
            const value = form.catchValues().products * form.catchValues().productsQuantity
            cost.innerHTML = 'Custo: ' + utils.formatPrice(value)
        }

        document.querySelector('.divImage').innerHTML = ''
        const img = document.querySelector('.divImage').appendChild(document.createElement('img'))
        img.classList.add('img')
        img.setAttribute('src', cards.searchProductName(form.catchValues().products).image)
    }
}

const form = {
    productsQuantity: document.getElementById('productsQuantity'),
    products: document.getElementById('products'),
    catchValues() {
        const productsQuantity = Number(this.productsQuantity.value)
        const products = Number(this.products.value)
        return { productsQuantity, products }
    },
    checkFields() {
        if (this.catchValues().products === '' || this.catchValues().products == 0 || this.catchValues().productsQuantity === "" || this.catchValues().productsQuantity <= 0) {
            throw Error
        }
    },
    clearFields() {
        this.products.value = ''
        this.productsQuantity.value = ''
        document.querySelector('.divImage').innerHTML = ''
        document.querySelector('.quantity').innerHTML = '0 unidades'
        document.querySelector('.cost').innerHTML = 'Custo: R$ 0,00'
    },
    initCards() {
        document.querySelector('.sectionCards').innerHTML = ''
        cards.array.forEach(
            (index) => {
                cards.createDiv(index)
            }
        )
    },
    fixScroll() {
        let length = cards.array.length
        if (length >= 3) {
            document.body.style.overflow = 'hidden';
        }
    },
    submit(event) {
        event.preventDefault()
        try {
            const values = this.catchValues()
            this.checkFields()
            cards.array.push(values)
            calculator.updateBalance()
            cards.removeOn()
            form.initCards()
            overlay.close()
        } catch (error) {
            setTimeout(() => {
                if (this.catchValues().products == 0) {
                    this.products.setAttribute('style', 'box-shadow: 0 0 6px #ee2828;')
                }
                if (this.catchValues().products == 0) {
                    this.productsQuantity.setAttribute('style', 'box-shadow: 0 0 6px #ee2828;')
                }
                const div = document.body.appendChild(document.createElement('div'))
                const div2 = div.appendChild(document.createElement('div')).innerHTML = 'Por favor insira valores válidos nos campos'
                div.className = 'errorMenssage'
                setTimeout(() => {
                    div.classList.add('on')
                }, 100);
            }, 100);
            setTimeout(() => {
                document.querySelector('.errorMenssage').classList.remove('on')
                setTimeout(() => {
                    document.querySelector('.errorMenssage').remove()
                }, 1000);
                this.products.setAttribute('style', 'box-shadow: none;')
                this.productsQuantity.setAttribute('style', 'box-shadow: none;')
            }, 4000);
        }
    }
}
window.onload = setInterval(() => {
    document.querySelector('.brandIcon1').setAttribute('style', ';top: -770px;opacity: 0; visibility: hidden;transition: .5s;')
    document.querySelector('.brandIcon2').setAttribute('style', 'top: 0;opacity: 1; visibility: visible;transition: .5s;')
    setTimeout(() => {
        document.querySelector('.brandIcon1').setAttribute('style', ';top: 0;opacity: 1; visibility: visible;transition: .5s;')
        document.querySelector('.brandIcon2').setAttribute('style', 'top: -770px;opacity: 0; visibility: hidden;transition: .5s;')
    }, 4000)
}, 8000);