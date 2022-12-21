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
        bride: brideViewModel(planner.bride),
        groom: groomViewModel(planner.groom),
    }
}

//todo remove from here
function brideViewModel(bride) {
    return {
        id: bride._id,
        firstName: bride.firstName,
        lastName: bride.lastName,
    }
}

//todo remove from here
function groomViewModel(groom) {
    return {
        id: groom._id,
        firstName: groom.firstName,
        lastName: groom.lastName,
    }
}

module.exports = {
    plannerLinkViewModel,
    plannerViewModel,
}