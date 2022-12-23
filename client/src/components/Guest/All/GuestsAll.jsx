import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as guestsService from '../../../services/guests';

import CreateGuest from '../Create/CreateGuest';
import SingleGuest from '../Single/SingleGuest';

import styles from './GuestsAll.module.css';

function GuestsAll() {
    //todo extract bride and groom
    //todo divs bride side - groom side
    //todo hover effect for edit/delete
    //todo delete collections in mongo to test last changes -> TABLE!
    //todo test custom form tags after the changes!!!
    //todo cancel button always
    //todo extract child component
    //todo test create form!!!!!
    //todo test server error by creating guest 
    //todo test conformed, not confirmed guests calculations
    //todo test again!!!!

    const { id: plannerId } = useParams();
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        loadGuests();
    }, []);

    const loadGuests = () => {
        guestsService
            .all(plannerId)
            .then((res) => setGuests(res))
            .catch((err) => console.error(err));
    }

    const onDeleteHandler = (guestId) => {
        guestsService
            .deleteById(guestId)
            .then(() => {
                loadGuests();
            })
            .catch((err) => console.error(err));
    }

    return (
        <section className={styles["guests-all"]}>
            <div className="section-title-wrapper">
                <h2 className="section-title">Guests</h2>
            </div>
            <div className={styles["guests-all-main-content-wrapper"]}>
                {guests.map((g) =>
                    <SingleGuest
                        key={g.id}
                        id={g.id}
                        firstName={g.firstName}
                        lastName={g.lastName}
                        gender={g.gender}
                        age={g.age}
                        role={g.role}
                        table={g.table}
                        mainDish={g.mainDish}
                        confirmed={g.confirmed}
                        onDeleteHandler={onDeleteHandler}
                    />)
                }
            </div>
            <CreateGuest
                plannerId={plannerId}
                loadGuests={loadGuests}
            />
        </section>
    );
}

export default GuestsAll;