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
        budget: planner.budget,
        location: planner.location,
    }
}

module.exports = {
    plannerLinkViewModel,
    plannerViewModel,
}