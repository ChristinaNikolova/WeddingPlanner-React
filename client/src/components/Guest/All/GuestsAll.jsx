import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as guestsService from '../../../services/guests';
import * as images from '../../../utils/constants/images';

import FormGuest from '../Form/FormGuest';

import styles from './GuestsAll.module.css';

function GuestsAll() {
    //todo extract bride and groom
    //todo divs bride side - groom side
    //todo hover effect for edit/delete
    //todo delete collections in mongo to test last changes -> TABLE!
    //todo test custom form tags after the changes!!!
    //todo cancel button always
    //todo test create form!!!!!
    //todo test server error by creating guest 

    const { id: plannerId } = useParams();
    const [guests, setGuests] = useState([]);
    const [isHidden, setIsHidden] = useState(true);

    const formName = 'Create';
    const [serverError, setServerError] = useState('');

    useEffect(() => {
    }, [serverError]);

    useEffect(() => {
        loadGuests();
    }, []);

    const loadGuests = () => {
        guestsService
            .all(plannerId)
            .then((res) => setGuests(res))
            .catch((err) => console.error(err));
    }

    const getPersonImage = (guest) => {
        let image = '';

        if (guest.age === 'adult' && guest.gender === 'male') {
            image = images.personImages.ADULT_MALE;
        } else if (guest.age === 'adult' && guest.gender === 'female') {
            image = images.personImages.ADULT_FEMALE;
        } else if (guest.age === 'child' && guest.gender === 'male') {
            image = images.personImages.CHILD_MALE;
        } else if (guest.age === 'child' && guest.gender === 'female') {
            image = images.personImages.CHILD_FEMALE;
        } else if (guest.age === 'baby') {
            image = images.personImages.BABY;
        }

        return image;
    }

    const getDishImage = (guest) => {
        let image = '';

        if (guest.mainDish === 'meat') {
            image = images.dishImages.MEAT;
        } else if (guest.mainDish === 'fish') {
            image = images.dishImages.FISH;
        } else if (guest.mainDish === 'veggies') {
            image = images.dishImages.VEGGIES;
        }

        console.log(image);

        return image;
    }

    const onShowFormHandler = () => {
        setIsHidden(!isHidden);
    }

    const onSubmitHandler = (firstName, lastName, gender, age, side, role, table, mainDish, confirmed) => {
        guestsService.create(plannerId, firstName, lastName, gender, age, side, role, table, mainDish, confirmed)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                loadGuests();
                onCancelHandler();
            })
            .catch((err) => console.error(err));
    };

    const onCancelHandler = () => {
        setIsHidden(true);
    }

    return (
        <section className={styles["guests-all"]}>
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
                                {g.table === '' ? 'no info' : g.table}
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
            <div className="guests-all-create-form-wrapper">
                <div className={styles["guests-all-create-form-icon"]}>
                    <i onClick={onShowFormHandler} className="fa-solid fa-plus"></i>
                    Add guest
                </div>
                {!isHidden &&
                    <FormGuest
                        formName={formName}
                        onSubmitHandler={onSubmitHandler}
                        onCancelHandler={onCancelHandler}
                    />}
            </div>
        </section>
    );
}

export default GuestsAll;