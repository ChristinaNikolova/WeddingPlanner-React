import { cost } from '../constants/model';

export const validTitle = (title) => {
    return (title && title.length >= cost.TITLE_MIN_LEN && title.length <= cost.TITLE_MAX_LEN)
        ? ''
        : `Title should be between ${cost.TITLE_MIN_LEN} and ${cost.TITLE_MAX_LEN} characters long`;
}

export const validPrice = (price) => {
    return (price && price >= cost.PRICE_MIN)
        ? ''
        : 'Price should be a positive number';
}