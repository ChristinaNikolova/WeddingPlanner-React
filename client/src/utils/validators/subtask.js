import { subtask as subtaskModel } from '../constants/model';
import { global as globalErrors } from '../constants/errors';

export const validDescription = (description) => {
    return (description && description.length >= subtaskModel.DESC_MIN_LEN && description.length <= subtaskModel.DESC_MAX_LEN)
        ? ''
        : globalErrors.DESC(subtaskModel.DESC_MIN_LEN, subtaskModel.DESC_MAX_LEN);
}