import { guest } from '../constants/model';

export const validName = (name) => {
    return (name && name.length >= guest.NAME_MIN_LEN && name.length <= guest.NAME_MAX_LEN)
        ? ''
        : `Name should be between ${guest.NAME_MIN_LEN} and ${guest.NAME_MAX_LEN} characters long`;
}