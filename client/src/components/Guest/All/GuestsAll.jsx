import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as guestsService from '../../../services/guests';

import styles from './GuestsAll.module.css';

function GuestsAll() {
    //todo btn View Tables???
    //todo extract bride and groom
    //todo divs bride side - groom side
    //todo test images -> person + dish
    //todo hover effect for edit/delete
    //todo add guest button or + icon???

    const { id: plannerId } = useParams();
    const [guests, setGuests] = useState([]);

    const personImages = {
        adultFemale: <i className="fa-solid fa-person-dress"></i>,
        adultMale: <i className="fa-solid fa-person"></i>,
        childMale: <i className="fa-solid fa-child"></i>,
        childFemale: <i className="fa-solid fa-child-dress"></i>,
        baby: <i className="fa-solid fa-baby"></i>,
    };

    const dishImages = {
        meat: <i className="fa-solid fa-meat"></i>,
        fish: <i className="fa-solid fa-fish"></i>,
        veggies: <i className="fa-solid fa-salad"></i>,
    };

    useEffect(() => {
        guestsService
            .all(plannerId)
            .then((res) => setGuests(res))
            .catch((err) => console.error(err));
    }, []);

    const getPersonImage = (guest) => {
        let image = '';

        if (guest.age === 'adult' && guest.gender === 'male') {
            image = personImages.adultMale;
        } else if (guest.age === 'adult' && guest.gender === 'female') {
            image = personImages.adultFemale;
        } else if (guest.age === 'child' && guest.gender === 'male') {
            image = personImages.childMale;
        } else if (guest.age === 'child' && guest.gender === 'female') {
            image = personImages.childFemale;
        } else if (guest.age === 'baby') {
            image = personImages.baby;
        }

        return image;
    }

    const getDishImage = (guest) => {
        let image = '';

        if (guest.mainDish === 'meat') {
            image = dishImages.meat;
        } else if (guest.mainDish === 'fish') {
            image = dishImages.fish;
        } else if (guest.mainDish === 'veggies') {
            image = dishImages.veggies;
        }

        return image;
    }

    console.log(guests);

    return (<section className={styles["guests-all"]}>
        <div className="section-title-wrapper">
            <h2 className="section-title">Guests</h2>
        </div>
        <div className={styles["guests-all-main-content-wrapper"]}>
            {guests.map((g) =>
                <div key={g.id} className={styles["guests-all-info-wrapper"]}>
                    <div className="guests-all-info-left">
                        <p className={styles["guests-all-role"]}>{g.role}</p>
                        <p className={styles["guests-all-name"]}>
                            {g.firstName} {g.lastName}
                            <span className={styles["guests-all-image"]}>
                                {getPersonImage(g)}
                            </span>
                        </p>
                    </div>
                    <div className="guests-all-info-right">
                        <p className={styles["guests-all-info"]}>
                            <span className={styles["guests-all-info-title"]}>Table:</span>
                            {g.table === 0 ? '?' : g.table}
                        </p>
                        <p className={styles["guests-all-info"]}>
                            <span className={styles["guests-all-info-title"]}>Confirmed:</span>
                            {g.confirmed
                                ? <i className="fa-solid fa-check"></i>
                                : <i className="fa-solid fa-xmark"></i>
                            }
                        </p>
                        <p className={styles["guests-all-info"]}>
                            <span className={styles["guests-all-info-title"]}>Dish:</span>
                            {g.mainDish === 'no info'
                                ? g.mainDish
                                : getDishImage(g)
                            }
                        </p>
                    </div>
                </div>
            )}
        </div>
    </section>
    );
}

export default GuestsAll;