function taskViewModel(task) {
    //todo progress should be number with max value subtasks.length
    //todo add subTasks
    return {
        id: task._id,
        title: task.title,
        description: task.description,
        timespan: task.timespan,
        progress: task.progress,
        target: task.target,
        subTasks: task.subTasks,
    }
}

module.exports = {
    taskViewModel,
}