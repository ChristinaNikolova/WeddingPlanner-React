function plannerLinkViewModel(planner) {
    return {
        id: planner._id,
        title: planner.title,
    }
}

module.exports = {
    plannerLinkViewModel,
}