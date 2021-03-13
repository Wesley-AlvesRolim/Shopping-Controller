const overlay = {
    open() {
        document.querySelector('.overlay').removeAttribute('hidden')
        form.clearFields()
    },
    close() {
        document.querySelector('.overlay').setAttribute('hidden', '')
    }
}
const table = {
    array: [],
    deleteAll() {
        calculator.countingProducts.innerHTML = ''
        calculator.totalHtml.innerHTML = ''
        return this.array = []
    },
    removeOn() {
        if (table.array.length > 0) {
            document.querySelector('.removeOn').removeAttribute('style')
        } else {
            document.querySelector('.removeOn').setAttribute('style', 'opacity: 0; visibility: hidden;')
        }
    },
    createTable(index) {
        document.querySelector('.sectionTable').removeAttribute('style')
        const tr = document.createElement('tr')
        tr.innerHTML = table.innerHtml(index)
        document.querySelector('.tbody').appendChild(tr)
    },
    innerHtml(index) {
        const productsName = this.searchProductName(index.products).productsName
        const productImage =  this.searchProductName(index.products).image
        const tbodyContent = `
                <td class= "productName-Image"><img src="${productImage}" alt="${productsName}">${productsName}</td>
                <td>${index.productsQuantity}</td>
                <td>${utils.formatPrice(index.products * index.productsQuantity)}</td>`
        return tbodyContent
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
        }
        return {productsName,image}
    }
}
const calculator = {
    countingProducts: document.querySelector('.countingProducts'),
    totalHtml: document.querySelector('.total'),
    sumQuantity() {
        let quantity = 0
        for (let index = 0; index < table.array.length; index++) {
            const sum = table.array[index].productsQuantity;
            quantity = quantity + sum
        }
        return quantity
    },
    sumPrice() {
        let initialPrice = 0
        for (let index = 0; index < table.array.length; index++) {
            const sum = table.array[index].productsQuantity;
            const price = table.array[index].products;
            initialPrice = initialPrice + (price * sum)
        }
        return initialPrice
    },
    updateBalance(values) {
        table.array.push(values)
        const sum = this.sumQuantity()
        const price = calculator.sumPrice()
        this.countingProducts.innerHTML = `${sum} products`
        this.totalHtml.innerHTML = `Total: ${utils.formatPrice(price)}`
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
function focusEvent() {
    const cost = document.querySelector('.cost')
    const quantity = document.querySelector('.quantity')

    form.productsQuantity.oninput = function () {
        if (form.catchValues().productsQuantity <= 0) {
            const value = form.catchValues().products * form.catchValues().productsQuantity
            cost.innerHTML = 'Cost: ' + utils.formatPrice(value)
            quantity.innerHTML = 0 + ' units'
        } else {
            const value = form.catchValues().products * form.catchValues().productsQuantity
            cost.innerHTML = 'Cost: ' + utils.formatPrice(value)
            quantity.innerHTML = form.catchValues().productsQuantity + ' units'
        }
    }
    form.products.oninput = function () {
        if (form.catchValues().productsQuantity <= 0) {
            cost.innerHTML = `Cost: ${utils.formatPrice(0)}`
        } else {
            const value = form.catchValues().products * form.catchValues().productsQuantity
            cost.innerHTML = 'Cost: ' + utils.formatPrice(value)
        }
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
        document.querySelector('.quantity').innerHTML = '0 units'
        document.querySelector('.cost').innerHTML = 'Cost: R$ 0,00'
    },
    initTable() {
        document.querySelector('tbody').innerHTML = ''
        table.array.forEach(
            (index) => {
                table.createTable(index)
            }
        )
    },
    submit(event) {
        event.preventDefault()
        try {
            const values = this.catchValues()
            this.checkFields()
            calculator.updateBalance(values)
            table.removeOn()
            overlay.close()
            form.initTable()
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
            }, 100);
            setTimeout(() => {
                document.querySelector('.errorMenssage').remove()
            }, 4000);
        }
    }
}
window.onload = setInterval(() => {
    document.querySelector('header img').setAttribute('style', ';top: -770px;opacity: 0; visibility: hidden;transition: .5s;')
    document.querySelector('.brandIcon').setAttribute('style', 'top: 0;opacity: 1; visibility: visible;transition: .5s;')
    setTimeout(() => {
        document.querySelector('header img').setAttribute('style', ';top: 0;opacity: 1; visibility: visible;transition: .5s;')
        document.querySelector('.brandIcon').setAttribute('style', 'top: -770px;opacity: 0; visibility: hidden;transition: .5s;')
    }, 4000)
}, 8000);