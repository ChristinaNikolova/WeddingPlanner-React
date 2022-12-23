import * as constants from '../constants/guest';

export const validName = (name) => {
    return (name && name.length >= constants.guest.NAME_MIN_LEN && name.length <= constants.guest.NAME_MAX_LEN)
        ? ''
        : `Name should be between ${constants.guest.NAME_MIN_LEN} and ${constants.guest.NAME_MAX_LEN} characters long`;
}