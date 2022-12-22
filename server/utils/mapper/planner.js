function plannerLinkViewModel(planner) {
    return {
        id: planner._id,
        title: planner.title,
    }
}

function plannerViewModel(planner) {
    return {
        id: planner._id,
        title: planner.title,
        description: planner.description,
        date: planner.date,
        budget: planner.budget.toFixed(2),
        totalCosts: (calculateTotalCosts(planner.costs)).toFixed(2),
        location: planner.location,
        totalGuests: planner.guests.length,
        confirmedGuests: planner.guests.filter((g) => g.confirmed).length,
        totalTasks: calculateTotalTasks(planner.tasks),
        doneTasks: 100,
    }
    //todo add calculation here
}

function calculateTotalCosts(costs) {
    return costs.reduce((curr, acc) => curr.price + acc, 0);
}

function calculateTotalTasks(tasks) {
    return tasks.reduce((curr, acc) => curr.subTasks + acc, 0);
}

module.exports = {
    plannerLinkViewModel,
    plannerViewModel,
}