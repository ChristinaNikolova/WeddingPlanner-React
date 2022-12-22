function guestViewModel(guests) {
    //todo some refactoring here??
    return mapGuest(guests);
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
}