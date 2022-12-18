import * as constants from '../constants/article';

export const validTitle = (title) => {
    return (title && title.length >= constants.article.TITLE_MIN_LEN && title.length <= constants.article.TITLE_MAX_LEN)
        ? ''
        : `Title should be between ${constants.article.TITLE_MIN_LEN} and ${constants.article.TITLE_MAX_LEN} characters long`;
}

export const validContent = (content) => {
    return (content && content.length >= constants.article.CONTENT_MIN_LEN && content.length <= constants.article.CONTENT_MAX_LEN)
        ? ''
        : `Content should be between ${constants.article.CONTENT_MIN_LEN} and ${constants.article.CONTENT_MAX_LEN} characters long`;
}

export const validImage = (image) => {
    return image ? '' : 'Image is required';
}

export const validCategory = (category) => {
    return category !== constants.article.DEFAULT_CATEGORY_SELECTED_ID ? '' : 'Please select category';
}