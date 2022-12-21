import * as constants from '../constants/planner';

export const validDescription = (description) => {
    return (description && description.length >= constants.planner.DESCRIPTION_MIN_LEN && description.length <= constants.planner.DESCRIPTION_MAX_LEN)
        ? ''
        : `Description should be between ${constants.planner.DESCRIPTION_MIN_LEN} and ${constants.planner.DESCRIPTION_MAX_LEN} characters long`;
}

export const validBudget = (budget) => {
    return (budget >= constants.planner.BUDGET_MIN)
        ? ''
        : 'Budget should be a positive number';
}

export const validLocation = (location) => {
    return (location && location.length >= constants.planner.LOCATION_MIN_LEN && location.length <= constants.planner.LOCATION_MAX_LEN)
        ? ''
        : `Location should be between ${constants.planner.LOCATION_MIN_LEN} and ${constants.planner.LOCATION_MAX_LEN} characters long`;
}

export const validName = (name) => {
    return (name.match(constants.planner.NAME_REGEX))
        ? ''
        : 'Name should contain first and last name';
}

export const validDate = (date) => {
    return (date.match(constants.planner.DATE_REGEX))
        ? ''
        : 'Date should be in format dd.mm.yyyy';
}