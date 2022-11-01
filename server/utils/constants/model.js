const category = {
    NAME_MIN_LEN: 3,
    NAME_MAX_LEN: 30,
};

const cost = {
    TITLE_MIN_LEN: 3,
    TITLE_MAX_LEN: 80,
    DESC_MAX_LEN: 300,
};

const event = {
    TITLE_MIN_LEN: 5,
    TITLE_MAX_LEN: 100,
    DESC_MAX_LEN: 500,
    ADDRESS_MAX_LEN: 100,
};

const guest = {
    NAME_MIN_LEN: 1,
    NAME_MAX_LEN: 50,
    COMMENT_MAX_LEN: 500,
};

const note = {
    DESC_MIN_LEN: 5,
    DESC_MAX_LEN: 500,
};

const planner = {
    DESC_MAX_LEN: 500,
    LOCATION_MAX_LEN: 100,
};

const subTask = {
    TITLE_MIN_LEN: 5,
    TITLE_MAX_LEN: 100,
};

const task = {
    TITLE_MIN_LEN: 5,
    TITLE_MAX_LEN: 100,
    DESC_MAX_LEN: 500,
};

const user = {
    NAME_MIN_LEN: 1,
    NAME_MAX_LEN: 50,
};

module.exports = {
    category,
    cost,
    event,
    guest,
    note,
    planner,
    subTask,
    task,
    user,
};