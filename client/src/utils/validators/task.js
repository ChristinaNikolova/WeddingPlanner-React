import { task as taskModel } from "../constants/model";
import { global as globalErrors } from "../constants/errors";

export const validTitle = (title) => {
  return title &&
    title.length >= taskModel.TITLE_MIN_LEN &&
    title.length <= taskModel.TITLE_MAX_LEN
    ? ""
    : globalErrors.TITLE(taskModel.TITLE_MIN_LEN, taskModel.TITLE_MAX_LEN);
};

export const validDescription = (description) => {
  return description &&
    description.length >= taskModel.DESC_MIN_LEN &&
    description.length <= taskModel.DESC_MAX_LEN
    ? ""
    : globalErrors.DESC(taskModel.DESC_MIN_LEN, taskModel.DESC_MAX_LEN);
};
