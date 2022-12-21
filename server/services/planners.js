const { Types: { ObjectId } } = require('mongoose');
const Guest = require('../models/Guest');
const Planner = require("../models/Planner");
const { plannerLinkViewModel } = require("../utils/mapper/planner");
const { create: createGuest } = require('./guests');

async function allByUserId(userId) {
    return (await Planner
        .find({ creator: new ObjectId(userId) })
        .sort({ createdAt: -1 }))
        .map(plannerLinkViewModel);
}

async function create(description, date, budget, location, bride, groom, userId) {
    const [brideFirstName, brideLastName] = splitName(bride);
    const brideAsGuestResult = await createGuest(brideFirstName, brideLastName, 'female', 'adult', 'bride', 'bride', true);

    const [groomFirstName, groomLastName] = splitName(groom);
    const groomAsGuestResult = await createGuest(groomFirstName, groomLastName, 'male', 'adult', 'groom', 'groom', true);

    const planner = new Planner({
        title: `${bride} & ${groom}`,
        description,
        date,
        budget: Number(budget),
        location,
        bride: brideAsGuestResult._id,
        groom: groomAsGuestResult._id,
        creator: userId,
    });

    await planner.save();

    planner.guests.push(brideAsGuestResult._id);
    planner.guests.push(groomAsGuestResult._id);

    await planner.save();

    return planner;
}

function splitName(name) {
    return name
        .split(' ')
        .map((n) => n.trim());
}

module.exports = {
    allByUserId,
    create,
}