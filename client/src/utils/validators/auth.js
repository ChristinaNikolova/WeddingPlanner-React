import * as constants from '../constants/auth';

export const validEmail = (email) => {
    const emailRegex = new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    return (email && emailRegex.test(email))
        ? ''
        : 'Invalid email';
}

export const validName = (name) => {
    return (name && name.length >= constants.auth.NAME_MIN_LEN && name.length <= constants.auth.NAME_MAX_LEN)
        ? ''
        : `Name should be between ${constants.auth.NAME_MIN_LEN} and ${constants.auth.NAME_MAX_LEN} characters long`;
}

export const validPassword = (password) => {
    return (password && password.length >= constants.auth.PASSWORD_MIN_LEN && password.length <= constants.auth.PASSWORD_MAX_LEN)
        ? ''
        : `Password should be between ${constants.auth.PASSWORD_MIN_LEN} and ${constants.auth.PASSWORD_MAX_LEN} characters long`;
}

export const validPasswordMatch = (password, repass) => {
    return (password === repass)
        ? ''
        : 'Password und repeat password are not equal';
}