import { category } from '../constants/model';

export const validName = (name) => {
    return (name && name.length >= category.NAME_MIN_LEN && name.length <= category.NAME_MAX_LEN)
        ? ''
        : `Name should be between ${category.NAME_MIN_LEN} and ${category.NAME_MAX_LEN} characters long`;
}

export const validImage = (image) => {
    return image ? '' : 'Image is required';
}