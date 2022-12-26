import { event } from '../constants/model';
import { parseTime } from '../helpers/datetime';

//todo start time before end time (also on the server)

export const validTitle = (title) => {
    return (title && title.length >= event.TITLE_MIN_LEN && title.length <= event.TITLE_MAX_LEN)
        ? ''
        : `Title should be between ${event.TITLE_MIN_LEN} and ${event.TITLE_MAX_LEN} characters long`;
}

export const validStartTime = (time) => {
    return time
        ? ''
        : 'Time is required';
}

export const validEndTime = (start, end) => {
    const startTime = parseTime(start);
    const endTime = parseTime(end);

    if (startTime >= endTime) {
        console.log('error')
    } else {
        console.log('success');
    }
}
