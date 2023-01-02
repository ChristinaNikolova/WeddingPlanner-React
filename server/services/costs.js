const Planner = require("../models/Planner");
const { costViewModel } = require("../utils/mapper/costs");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('costs');

    //todo check soritng

    return planner.costs
        .sort((a, b) => a.title - b.title)
        .map(costViewModel);
}

module.exports = {
    all,
}