import { task } from '../constants/model';

export const validTitle = (title) => {
    return (title && title.length >= task.TITLE_MIN_LEN && title.length <= task.TITLE_MAX_LEN)
        ? ''
        : `Title should be between ${task.TITLE_MIN_LEN} and ${task.TITLE_MAX_LEN} characters long`;
}

export const validDescription = (description) => {
    return (description && description.length >= task.DESC_MIN_LEN && description.length <= task.DESC_MAX_LEN)
        ? ''
        : `Title should be between ${task.DESC_MIN_LEN} and ${task.DESC_MAX_LEN} characters long`;
}