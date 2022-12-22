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

async function update(id, firstName, lastName, gender, age, side, role, confirmed = false) {
    const guest = await getById(id);

    guest.firstName = firstName;
    guest.lastName = lastName;
    guest.gender = gender;
    guest.age = age;
    guest.side = side;
    guest.role = role;
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
}