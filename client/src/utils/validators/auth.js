import { auth } from '../constants/model';

export const validEmail = (email) => {
    const emailRegex = new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    return (email && emailRegex.test(email))
        ? ''
        : 'Invalid email';
}

export const validName = (name) => {
    return (name && name.length >= auth.NAME_MIN_LEN && name.length <= auth.NAME_MAX_LEN)
        ? ''
        : `Name should be between ${auth.NAME_MIN_LEN} and ${auth.NAME_MAX_LEN} characters long`;
}

export const validPassword = (password) => {
    return (password && password.length >= auth.PASSWORD_MIN_LEN && password.length <= auth.PASSWORD_MAX_LEN)
        ? ''
        : `Password should be between ${auth.PASSWORD_MIN_LEN} and ${auth.PASSWORD_MAX_LEN} characters long`;
}

export const validPasswordMatch = (password, repass) => {
    return (password === repass)
        ? ''
        : 'Password und repeat password are not equal';
}