const Cost = require("../models/Cost");
const Planner = require("../models/Planner");
const { costViewModel } = require("../utils/mapper/costs");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('costs');

    return planner.costs
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(costViewModel);
}

async function create(plannerId, title, price, category) {
    const cost = new Cost({
        title,
        price: Number(price),
        category,
    });

    const result = await cost.save();

    const planner = await Planner.findById(plannerId);
    planner.costs.push(result._id);
    await planner.save();

    return result;
}

async function deleteById(id) {
    //todo calculate budget, actual costs????
    return Cost.findByIdAndDelete(id);
}

module.exports = {
    all,
    create,
    deleteById,
}