import { note as noteModel } from '../constants/model';
import { global as globalErrors } from '../constants/errors';

export const validDescription = (description) => {
    return (description && description.length >= noteModel.DESC_MIN_LEN && description.length <= noteModel.DESC_MAX_LEN)
        ? ''
        : globalErrors.DESC(noteModel.DESC_MIN_LEN, noteModel.DESC_MAX_LEN);
}