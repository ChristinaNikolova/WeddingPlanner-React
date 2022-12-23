const Guest = require("../models/Guest");
const Planner = require("../models/Planner");
const { guestViewModel } = require("../utils/mapper/guest");

async function all(plannerId) {
    //todo add some kind of soring!!!!
    //todo extract 2 collection + 1 collection from bride and groom?
    const planner = await Planner
        .findById(plannerId)
        .populate('guests');

    return guestViewModel(planner.guests);
}

async function create(firstName, lastName, gender, age, side, role, table, mainDish, confirmed, plannerId) {
    const guest = new Guest({
        firstName,
        lastName,
        gender,
        age,
        side,
        role,
        table,
        mainDish,
        confirmed: confirmed,
    });

    const result = await guest.save();

    if (plannerId) {
        const planner = await Planner.findById(plannerId);
        planner.guests.push(result._id);
        await planner.save();
    }

    return result;
}

async function update(id, firstName, lastName, gender, age, side, role, table, mainDish, confirmed) {
    const guest = await getById(id);

    guest.firstName = firstName;
    guest.lastName = lastName;
    guest.gender = gender;
    guest.age = age;
    guest.side = side;
    guest.role = role;
    guest.table = table;
    guest.mainDish = mainDish;
    guest.confirmed = confirmed;

    await guest.save();

    return guest;
}

async function getById(id) {
    return Guest.findById(id);
}

module.exports = {
    create,
    update,
    all,
}