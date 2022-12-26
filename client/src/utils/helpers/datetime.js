export const parseTime = (time) => {
    const [hour, minutes] = time.split(':');
    const date = new Date("", "", "", hour, minutes);

    return date.toLocaleTimeString();
}

export const getDifference = (start, end) => {
    const difference = new Date("01/01/2007 " + end) - new Date("01/01/2007 " + start);

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