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
        bride: planner.bride.firstName + ' ' + planner.bride.lastName,
        brideId: planner.bride._id,
        groom: planner.groom.firstName + ' ' + planner.groom.lastName,
        groomId: planner.groom._id,
        totalCosts: (calculateTotalCosts(planner.costs)).toFixed(2),
        location: planner.location,
        totalGuests: planner.guests.length,
        brideGuests: planner.guests.filter((g) => g.side === 'bride').length,
        groomGuests: planner.guests.filter((g) => g.side === 'groom').length,
        confirmedGuests: planner.guests.filter((g) => g.confirmed).length,
        totalTasks: calculateTotalTasks(planner.tasks),
        doneTasks: 100,
        events: planner.events.length,
        notes: planner.notes.length,
    }
    //todo add calculation here
    //todo extract function!!!!
}

function calculateTotalCosts(costs) {
    return costs.reduce((acc, curr) => curr.price + acc, 0);
}

function calculateTotalTasks(tasks) {
    return tasks.reduce((acc, curr) => curr.subTasks + acc, 0);
}

module.exports = {
    plannerLinkViewModel,
    plannerViewModel,
}