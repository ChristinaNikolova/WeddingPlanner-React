import { subtask } from '../constants/model';

export const validDescription = (description) => {
    return (description && description.length >= subtask.DESC_MIN_LEN && description.length <= subtask.DESC_MAX_LEN)
        ? ''
        : `Description should be between ${subtask.DESC_MIN_LEN} and ${subtask.DESC_MAX_LEN} characters long`;
}