export const utils = {
    formatPrice(value) {
        const converted = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return converted;
    },
};