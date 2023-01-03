import { auth as authModel } from '../constants/model';
import { auth as authErrors, global as globalErrors } from '../constants/errors';

export const validEmail = (email) => {
    const emailRegex = new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    return (email && emailRegex.test(email))
        ? ''
        : authErrors.EMAIL;
}

export const validName = (name) => {
    return (name && name.length >= authModel.NAME_MIN_LEN && name.length <= authModel.NAME_MAX_LEN)
        ? ''
        : globalErrors.NAME(authModel.NAME_MIN_LEN, authModel.NAME_MAX_LEN);
}

export const validPassword = (password) => {
    return (password && password.length >= authModel.PASSWORD_MIN_LEN && password.length <= authModel.PASSWORD_MAX_LEN)
        ? ''
        : authErrors.PASSWORD(authModel.PASSWORD_MIN_LEN, authModel.PASSWORD_MAX_LEN);
}

export const validPasswordMatch = (password, repass) => {
    return (password === repass)
        ? ''
        : authErrors.REPEAT_PASSWORD;
}