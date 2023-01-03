import { event as eventModel } from '../constants/model';
import { event as eventErrors, global as globalErrors } from '../constants/errors';
import { parseTime } from '../helpers/datetime';

export const validTitle = (title) => {
    return (title && title.length >= eventModel.TITLE_MIN_LEN && title.length <= eventModel.TITLE_MAX_LEN)
        ? ''
        : globalErrors.TITLE(eventModel.TITLE_MIN_LEN, eventModel.TITLE_MAX_LEN);
}

export const validTime = (start, end) => {
    const startTime = parseTime(start);
    const endTime = parseTime(end);

    return startTime < endTime
        ? ''
        : eventErrors.TIME;
}
