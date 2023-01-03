import { article, category as categoryModel } from '../constants/model';

export const validTitle = (title) => {
    return (title && title.length >= article.TITLE_MIN_LEN && title.length <= article.TITLE_MAX_LEN)
        ? ''
        : `Title should be between ${article.TITLE_MIN_LEN} and ${article.TITLE_MAX_LEN} characters long`;
}

export const validContent = (content) => {
    return (content && content.length >= article.CONTENT_MIN_LEN && content.length <= article.CONTENT_MAX_LEN)
        ? ''
        : `Content should be between ${article.CONTENT_MIN_LEN} and ${article.CONTENT_MAX_LEN} characters long`;
}

export const validImage = (image) => {
    return image ? '' : 'Image is required';
}

export const validCategory = (category) => {
    return category !== categoryModel.DEFAULT_CATEGORY_SELECTED_ID ? '' : 'Please select category';
}