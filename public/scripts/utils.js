import { products } from './data';
import { cards } from './cards';

export const utils = {
  formatPrice(value) {
    const converted = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return converted;
  },
};

export function stock(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

export function decreaseStock(obj, productsQuantity) {
  const position = products.indexOf(obj);
  const productBuy = products[position];
  const calcStock = productBuy.stock - productsQuantity;
  if (calcStock < 0) return;
  productBuy.stock = calcStock;
  if (productBuy.stock <= 0) cards.stockZero(position);
};

export function increaseStock(obj, position) {
  const productBuy = products[position];
  const calcStock = productBuy.stock + obj.productsQuantity;
  if (calcStock > obj.stock) return;
  productBuy.stock = calcStock;
  if (productBuy.stock > 0) cards.stockExist(position);
};
