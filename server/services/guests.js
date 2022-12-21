const Guest = require("../models/Guest");

async function create(firstName, lastName, gender, age, side, role, confirmed = false) {
    const guest = new Guest({
        firstName,
        lastName,
        gender,
        age,
        side,
        role,
        confirmed: confirmed,
    });

    await guest.save();

    return guest;
}

module.exports = {
    create,
}