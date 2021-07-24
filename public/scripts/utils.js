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
