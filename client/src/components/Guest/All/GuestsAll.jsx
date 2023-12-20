import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as guestsService from "../../../services/guests";
import { scrollToTop } from "../../../utils/helpers/form";

import CreateGuest from "../Create/CreateGuest";
import UpdateGuest from "../Update/UpdateGuest";
import SingleGuest from "../Single/SingleGuest";

import styles from "./GuestsAll.module.css";

function GuestsAll() {
  const { id: plannerId } = useParams();
  const [guestId, setGuestId] = useState("");
  const [guests, setGuests] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [isEditIconHidden, setIsEditIconHidden] = useState(false);

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = () => {
    guestsService
      .all(plannerId)
      .then((res) => {
        setGuests(res);
        scrollToTop();
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHandler = () => {
    setIsHidden(true);
    setIsEditIconHidden(false);
    setGuestId("");
  };

  const onShowFormHandler = (guestId) => {
    setIsHidden(!isHidden);
    guestId ? setGuestId(guestId) : setGuestId("");
    setIsEditIconHidden(!isEditIconHidden);
  };

  const onDeleteHandler = (guestId) => {
    guestsService
      .deleteById(guestId)
      .then(() => {
        loadGuests();
      })
      .catch((err) => console.error(err));
  };

  return (
    <section
      id={styles["guests-all"]}
      className="section-planner section-background"
    >
      <div className="section-title-wrapper">
        <h2 className="section-title">Guests</h2>
      </div>
      <div className={styles["guests-all-main-content-wrapper"]}>
        {guests.map((g) => (
          <SingleGuest
            key={g.id}
            id={g.id}
            firstName={g.firstName}
            lastName={g.lastName}
            gender={g.gender}
            age={g.age}
            role={g.role}
            side={g.side}
            table={g.table}
            mainDish={g.mainDish}
            confirmed={g.confirmed}
            isEditIconHidden={isEditIconHidden}
            onDeleteHandler={onDeleteHandler}
            onShowFormHandler={onShowFormHandler}
          />
        ))}
      </div>
      {guestId ? (
        <UpdateGuest
          guestId={guestId}
          plannerId={plannerId}
          onCancelFormHandler={onCancelFormHandler}
          loadGuests={loadGuests}
        />
      ) : (
        <CreateGuest
          plannerId={plannerId}
          isHidden={isHidden}
          onCancelFormHandler={onCancelFormHandler}
          onShowFormHandler={onShowFormHandler}
          loadGuests={loadGuests}
        />
      )}
    </section>
  );
}

export default GuestsAll;
