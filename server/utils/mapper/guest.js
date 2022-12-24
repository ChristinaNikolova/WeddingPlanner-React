function guestViewModel(guests) {
    //todo some refactoring here??
    return mapGuest(guests);
}

function guestSingleViewModel(guest) {
    //todo some refactoring here??
    return {
        id: guest._id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        gender: guest.gender,
        age: guest.age,
        side: guest.side,
        role: guest.role,
        table: guest.table,
        mainDish: guest.mainDish,
        confirmed: guest.confirmed,
    }
}

function mapGuest(guests) {
    const result = guests.reduce((acc, curr) => {
        acc.push({
            id: curr._id,
            firstName: curr.firstName,
            lastName: curr.lastName,
            gender: curr.gender,
            age: curr.age,
            side: curr.side,
            role: curr.role,
            table: curr.table,
            mainDish: curr.mainDish,
            confirmed: curr.confirmed,
        });

        return acc;
    }, []);

    return result;
}

module.exports = {
    guestViewModel,
    guestSingleViewModel,
}