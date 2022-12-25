import { note } from '../constants/model';

export const validDescription = (description) => {
    return (description && description.length >= note.DESC_MIN_LEN && description.length <= note.DESC_MAX_LEN)
        ? ''
        : `Description should be between ${note.DESC_MIN_LEN} and ${note.DESC_MAX_LEN} characters long`;
}