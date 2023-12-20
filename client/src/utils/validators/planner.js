import { planner as plannerModel } from "../constants/model";
import {
  planner as plannerErrors,
  global as globalErrors,
} from "../constants/errors";

export const validDescription = (description) => {
  return description &&
    description.length >= plannerModel.DESCRIPTION_MIN_LEN &&
    description.length <= plannerModel.DESCRIPTION_MAX_LEN
    ? ""
    : globalErrors.DESC(
        plannerModel.DESCRIPTION_MIN_LEN,
        plannerModel.DESCRIPTION_MAX_LEN
      );
};

export const validBudget = (budget) => {
  return budget && budget >= plannerModel.BUDGET_MIN
    ? ""
    : plannerErrors.BUDGET;
};

export const validLocation = (location) => {
  return location &&
    location.length >= plannerModel.LOCATION_MIN_LEN &&
    location.length <= plannerModel.LOCATION_MAX_LEN
    ? ""
    : plannerErrors.LOCATION(
        plannerModel.LOCATION_MIN_LEN,
        plannerModel.LOCATION_MAX_LEN
      );
};

export const validName = (name) => {
  return name.match(plannerModel.NAME_REGEX) ? "" : plannerErrors.NAME;
};

export const validDate = (date) => {
  return date.match(plannerModel.DATE_REGEX) ? "" : plannerErrors.DATE;
};
