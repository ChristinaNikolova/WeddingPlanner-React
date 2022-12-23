import { useState } from 'react';

import * as images from '../../../utils/constants/images';

import styles from './SingleGuest.module.css';

function SingleGuest({ id, firstName, lastName, gender, age, role, table, mainDish, confirmed, onDeleteHandler }) {
    const [isHovering, setIsHovering] = useState(false);

    const getPersonImage = (age, gender) => {
        let image = '';

        if (age === 'adult' && gender === 'male') {
            image = images.personImages.ADULT_MALE;
        } else if (age === 'adult' && gender === 'female') {
            image = images.personImages.ADULT_FEMALE;
        } else if (age === 'child' && gender === 'male') {
            image = images.personImages.CHILD_MALE;
        } else if (age === 'child' && gender === 'female') {
            image = images.personImages.CHILD_FEMALE;
        } else if (age === 'baby') {
            image = images.personImages.BABY;
        }

        return image;
    }

    const getDishImage = (mainDish) => {
        let image = '';

        if (mainDish === 'meat') {
            image = images.dishImages.MEAT;
        } else if (mainDish === 'fish') {
            image = images.dishImages.FISH;
        } else if (mainDish === 'veggies') {
            image = images.dishImages.VEGGIES;
        }

        return image;
    }

    const onMouseEnterHandler = () => {
        setIsHovering(true);
    }

    const onMouseLeaveHandler = () => {
        setIsHovering(false);
    }

    return (
        <div key={id} className={styles["guests-all-info-wrapper"]}>
            <div className="guests-all-info-left">
                <p className={styles["guests-all-role"]}>{role}</p>
                <p onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={styles["guests-all-name"]}>
                    {firstName} {lastName}
                    <span className={styles["guests-all-image"]}>
                        {getPersonImage(age, gender)}
                    </span>
                    {isHovering &&
                        <span className={styles["guests-all-icons"]}>
                            <i className="fa-solid fa-pen"></i>
                            {role !== 'bride' && role !== 'groom' &&
                                <i onClick={() => onDeleteHandler(id, role)} className="fa-solid fa-trash"></i>
                            }
                        </span>
                    }
                </p>
            </div>
            <div className="guests-all-info-right">
                <p className={styles["guests-all-info"]}>
                    <span className={styles["guests-all-info-title"]}>Table:</span>
                    {table === '' ? 'no info' : table}
                </p>
                <p className={styles["guests-all-info"]}>
                    <span className={styles["guests-all-info-title"]}>Confirmed:</span>
                    {confirmed
                        ? <i className="fa-solid fa-check"></i>
                        : <i className="fa-solid fa-xmark"></i>
                    }
                </p>
                <p className={styles["guests-all-info"]}>
                    <span className={styles["guests-all-info-title"]}>Dish:</span>
                    {mainDish === 'no info'
                        ? mainDish
                        : getDishImage(mainDish)
                    }
                </p>
            </div>
        </div>
    );
}

export default SingleGuest;