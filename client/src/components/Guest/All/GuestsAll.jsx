import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as guestsService from '../../../services/guests';

import CreateGuest from '../Create/CreateGuest';
import UpdateGuest from '../Update/UpdateGuest';
import SingleGuest from '../Single/SingleGuest';

import styles from './GuestsAll.module.css';

function GuestsAll() {
    //todo extract bride and groom
    //todo divs bride side - groom side

    //todo test custom form tags after the changes!!!
    //todo cancel button always

    const { id: plannerId } = useParams();
    const [guestId, setGuestId] = useState('');
    const [guests, setGuests] = useState([]);
    const [isHidden, setIsHidden] = useState(true);
    const [isEditIconHidden, setIsEditIconHidden] = useState(false);

    useEffect(() => {
        loadGuests();
    }, []);

    const loadGuests = () => {
        guestsService
            .all(plannerId)
            .then((res) => setGuests(res))
            .catch((err) => console.error(err));
    }

    const onCancelFormHandler = () => {
        setIsHidden(true);
        setIsEditIconHidden(false);
        setGuestId('');
    }

    const onShowFormHandler = (guestId) => {
        setIsHidden(!isHidden);
        guestId ? setGuestId(guestId) : setGuestId('');
        setIsEditIconHidden(!isEditIconHidden);
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
                        isEditIconHidden={isEditIconHidden}
                        onDeleteHandler={onDeleteHandler}
                        onShowFormHandler={onShowFormHandler}
                    />)
                }
            </div>
            {guestId
                ? <UpdateGuest
                    guestId={guestId}
                    plannerId={plannerId}
                    onCancelFormHandler={onCancelFormHandler}
                    loadGuests={loadGuests}
                />
                : <CreateGuest
                    plannerId={plannerId}
                    isHidden={isHidden}
                    onCancelFormHandler={onCancelFormHandler}
                    onShowFormHandler={onShowFormHandler}
                    loadGuests={loadGuests}
                />
            }
        </section>
    );
}

export default GuestsAll;