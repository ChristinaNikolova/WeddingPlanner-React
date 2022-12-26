export const parseTime = (time) => {
    const [hour, minutes] = time.split(':');
    const date = new Date("", "", "", hour, minutes);
    return date.toLocaleTimeString();
}