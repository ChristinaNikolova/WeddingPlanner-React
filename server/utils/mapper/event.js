function eventViewModel(event) {
    return {
        id: event._id,
        title: event.title,
        startTime: event.startTime,
        endTime: event.endTime,
        duration: event.duration,
    }
}

module.exports = {
    eventViewModel,
}