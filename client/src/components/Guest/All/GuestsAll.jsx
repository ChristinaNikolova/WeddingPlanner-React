import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as guestsService from '../../../services/guests';
import * as constants from '../../../utils/constants/images';

import styles from './GuestsAll.module.css';

function GuestsAll() {
    //todo extract bride and groom
    //todo divs bride side - groom side
    //todo test images -> person + dish
    //todo hover effect for edit/delete
    //todo add guest button or + icon???
    //todo add min height

    const { id: plannerId } = useParams();
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        guestsService
            .all(plannerId)
            .then((res) => setGuests(res))
            .catch((err) => console.error(err));
    }, []);

    const getPersonImage = (guest) => {
        let image = '';

        if (guest.age === 'adult' && guest.gender === 'male') {
            image = constants.personImages.ADULT_MALE;
        } else if (guest.age === 'adult' && guest.gender === 'female') {
            image = constants.personImages.ADULT_FEMALE;
        } else if (guest.age === 'child' && guest.gender === 'male') {
            image = constants.personImages.CHILD_MALE;
        } else if (guest.age === 'child' && guest.gender === 'female') {
            image = constants.personImages.CHILD_FEMALE;
        } else if (guest.age === 'baby') {
            image = constants.personImages.BABY;
        }

        return image;
    }

    const getDishImage = (guest) => {
        let image = '';

        if (guest.mainDish === 'meat') {
            image = constants.dishImages.MEAT;
        } else if (guest.mainDish === 'fish') {
            image = constants.dishImages.FISH;
        } else if (guest.mainDish === 'veggies') {
            image = constants.dishImages.VEGGIES;
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