import { useState } from 'react';

import * as images from '../../../utils/constants/images';
import { dishes, people, genders } from '../../../utils/constants/global';

import styles from './SingleGuest.module.css';

function SingleGuest({
    id,
    firstName,
    lastName,
    gender,
    age,
    role,
    side,
    table,
    mainDish,
    confirmed,
    isEditIconHidden,
    onDeleteHandler,
    onShowFormHandler
}) {
    const [isHovering, setIsHovering] = useState(false);

    const getPersonImage = (age, gender) => {
        let image = '';

        if (age === people.ADULT && gender === genders.MALE) {
            image = images.personImages.ADULT_MALE;
        } else if (age === people.ADULT && gender === genders.FEMALE) {
            image = images.personImages.ADULT_FEMALE;
        } else if (age === people.CHILD && gender === genders.MALE) {
            image = images.personImages.CHILD_MALE;
        } else if (age === people.CHILD && gender === genders.FEMALE) {
            image = images.personImages.CHILD_FEMALE;
        } else if (age === people.BABY) {
            image = images.personImages.BABY;
        }

        return image;
    }

    const getDishImage = (mainDish) => {
        let image = '';

        if (mainDish === dishes.MEAT) {
            image = images.dishImages.MEAT;
        } else if (mainDish === dishes.FISH) {
            image = images.dishImages.FISH;
        } else if (mainDish === dishes.VEGGIES) {
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
        <div className={styles["guests-all-info-wrapper"]}>
            <div className={styles["guests-all-info-left"]}>
                <p className={styles["guests-all-role"]}>{role}</p>
                <p onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={styles["guests-all-name"]}>
                    {firstName} {lastName}
                    <span className={styles["guests-all-image"]}>
                        {getPersonImage(age, gender)}
                    </span>
                    {isHovering &&
                        <span className={styles["guests-all-icons"]}>
                            {!isEditIconHidden && <i onClick={() => onShowFormHandler(id)} className="fa-solid fa-pen"></i>}
                            {role !== 'bride' && role !== 'groom' && !isEditIconHidden &&
                                <i onClick={() => onDeleteHandler(id)} className="fa-solid fa-trash"></i>
                            }
                        </span>
                    }
                </p>
                <p className={styles["guests-all-side"]}>
                    <span className={styles["guests-all-info-title"]}>Side:</span>
                    {side}
                </p>
            </div>
            <div className={styles["guests-all-info-right"]}>
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