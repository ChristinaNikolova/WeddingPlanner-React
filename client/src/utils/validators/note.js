import * as constants from '../constants/note';

export const validDescription = (description) => {
    return (description && description.length >= constants.note.DESC_MIN_LEN && description.length <= constants.note.DESC_MAX_LEN)
        ? ''
        : `Description should be between ${constants.note.DESC_MIN_LEN} and ${constants.note.DESC_MAX_LEN} characters long`;
}