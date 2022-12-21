const { Types: { ObjectId } } = require('mongoose');
const Planner = require("../models/Planner");
const { plannerLinkViewModel } = require("../utils/mapper/planner");

async function allByUserId(userId) {
    return (await Planner
        .find({creator: new ObjectId(userId)})
        .sort({ createdAt: -1 }))
        .map(plannerLinkViewModel);
}

module.exports = {
    allByUserId
}