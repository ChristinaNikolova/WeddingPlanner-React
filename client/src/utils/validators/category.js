import * as constants from '../constants/category';

export const validName = (name) => {
    return (name && name.length >= constants.category.NAME_MIN_LEN && name.length <= constants.category.NAME_MAX_LEN)
        ? ''
        : `Name should be between ${constants.category.NAME_MIN_LEN} and ${constants.category.NAME_MAX_LEN} characters long`;
}

export const validImage = (image) => {
    return image ? '' : 'Image is required';
}