function subtaskViewModel(subtask) {
    return {
        id: subtask._id,
        description: subtask.description,
    }
}

module.exports = {
    subtaskViewModel,
}