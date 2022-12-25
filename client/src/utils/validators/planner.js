import { planner } from '../constants/model';

export const validDescription = (description) => {
    return (description && description.length >= planner.DESCRIPTION_MIN_LEN && description.length <= planner.DESCRIPTION_MAX_LEN)
        ? ''
        : `Description should be between ${planner.DESCRIPTION_MIN_LEN} and ${planner.DESCRIPTION_MAX_LEN} characters long`;
}

export const validBudget = (budget) => {
    return (budget && budget >= planner.BUDGET_MIN)
        ? ''
        : 'Budget should be a positive number';
}

export const validLocation = (location) => {
    return (location && location.length >= planner.LOCATION_MIN_LEN && location.length <= planner.LOCATION_MAX_LEN)
        ? ''
        : `Location should be between ${planner.LOCATION_MIN_LEN} and ${planner.LOCATION_MAX_LEN} characters long`;
}

export const validName = (name) => {
    return (name.match(planner.NAME_REGEX))
        ? ''
        : 'Name should contain first and last name';
}

export const validDate = (date) => {
    return (date.match(planner.DATE_REGEX))
        ? ''
        : 'Date should be in format DD.MM.YYYY';
}