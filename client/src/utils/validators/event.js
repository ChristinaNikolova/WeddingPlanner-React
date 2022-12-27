import { event } from '../constants/model';
import { parseTime } from '../helpers/datetime';

export const validTitle = (title) => {
    return (title && title.length >= event.TITLE_MIN_LEN && title.length <= event.TITLE_MAX_LEN)
        ? ''
        : `Title should be between ${event.TITLE_MIN_LEN} and ${event.TITLE_MAX_LEN} characters long`;
}

export const validTime = (start, end) => {
    const startTime = parseTime(start);
    const endTime = parseTime(end);

    return startTime < endTime
        ? ''
        : 'End time should be after the start time';
}
