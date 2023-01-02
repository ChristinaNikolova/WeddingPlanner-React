export const parseTime = (time) => {
    return parseDate(time).toLocaleTimeString();
}

export const parseDate = (time) => {
    const [hour, minutes] = time.split(':');
    return new Date('', '', '', hour, minutes);
}

export const getDifference = (start, end) => {
    const difference = new Date('01/01/2007 ' + end) - new Date('01/01/2007 ' + start);

    let hours = formatTime(Math.floor((difference / (1000 * 60 * 60)) % 24));
    let minutes = formatTime(Math.floor((difference / (1000 * 60)) % 60));

    if (hours.toString().includes('-') || minutes.toString().includes('-')) {
        hours = '00';
        minutes = '00';
    }

    return [hours, minutes];
}

const formatTime = (time) => {
    return time <= 9 ? `0${time}` : time;
}