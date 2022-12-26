function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}

function formatCreatedAt(createdAt) {
    //todo test month in january
    return createdAt.getDate()
        + '/'
        + (createdAt.getMonth() + 1)
        + '/'
        + createdAt.getFullYear().toString().substr(-2);
}

function extractTimeFromDate(date) {
    let time = date.toLocaleTimeString();
    time = (time.split(' ')[0]);
    time = time.slice(0, time.lastIndexOf(':'));

    return time;
}

module.exports = {
    mapErrors,
    formatCreatedAt,
    extractTimeFromDate,
};