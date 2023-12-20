import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import * as plannersService from "../../../services/planners";

import styles from "./DetailsPlanner.module.css";

function DetailsPlanner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plannerRef = useRef(null);

  const [planner, setPlanner] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    plannersService
      .getById(id)
      .then((res) => {
        setPlanner(res);
        plannerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const onMouseEnterHandler = () => {
    setIsHovering(true);
  };

  const onMouseLeaveHandler = () => {
    setIsHovering(false);
  };

  const onDeleteHandler = () => {
    plannersService
      .deleteById(id)
      .then(() => {
        navigate("/plan");
      })
      .catch((err) => console.error(err));
  };

  return (
    <section
      ref={plannerRef}
      id={styles["details-planner"]}
      className={styles["details-planner"]}
    >
      <div className="section-title-wrapper">
        <h2
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          className="section-title"
        >
          {planner.title}
          {isHovering && (
            <span className={styles["details-planner-icons"]}>
              <Link to={`/plan/edit/${id}`}>
                <i className="fa-solid fa-pen"></i>
              </Link>
              <i onClick={onDeleteHandler} className="fa-solid fa-trash"></i>
            </span>
          )}
        </h2>
      </div>
      <div className={styles["details-planner-main-content-wrapper"]}>
        <div className={styles["details-planner-section"]}>
          <div className={styles["details-planner-img-wrapper"]}>
            <img
              className="img"
              src="/img/Bride-PNG-Image-30858.png"
              alt="bride"
            />
          </div>
          <div className={styles["details-planner-img-wrapper"]}>
            <img
              className="img"
              src="/img/Groom-PNG-Image-95770.png"
              alt="groom"
            />
          </div>
        </div>
        <div
          className={`${styles["details-planner-section"]} ${styles["details-planner-border"]}`}
        >
          <div className={styles["details-planner-content-wrapper"]}>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>Date:</span>
              {planner.date}
            </p>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>Location:</span>
              {planner.location}
            </p>
          </div>
          <p className={styles["details-planner-event-info-description"]}>
            {planner.description}
          </p>
        </div>
        <div
          className={`${styles["details-planner-section"]} ${styles["details-planner-border"]}`}
        >
          <h4 className={styles["details-planner-section-title"]}>Guests</h4>
          <div className={styles["details-planner-btns-wrapper"]}>
            <Link className="btn" to={`/${id}/guest`}>
              Guests List
            </Link>
          </div>
          <div className={styles["details-planner-content-wrapper"]}>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Total guests:
              </span>
              {planner.totalGuests}
            </p>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Confirmed guests:
              </span>
              {planner.confirmedGuests}
            </p>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Bride's guests:
              </span>
              {planner.brideGuests}
            </p>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Groom's guests:
              </span>
              {planner.groomGuests}
            </p>
          </div>
        </div>
        <div
          className={`${styles["details-planner-section"]} ${styles["details-planner-border"]}`}
        >
          <h4 className={styles["details-planner-section-title"]}>Budget</h4>
          <div className={styles["details-planner-btns-wrapper"]}>
            <Link
              to={`/${id}/budget`}
              state={{ budget: planner.budget }}
              className="btn"
            >
              Costs
            </Link>
          </div>
          <div className={styles["details-planner-content-wrapper"]}>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Target budget:
              </span>
              ${planner.budget}
            </p>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Actual costs:
              </span>
              ${planner.actualCosts}
            </p>
          </div>
        </div>
        <div
          className={`${styles["details-planner-section"]} ${styles["details-planner-border"]}`}
        >
          <h4 className={styles["details-planner-section-title"]}>Checklist</h4>
          <div className={styles["details-planner-btns-wrapper"]}>
            <Link className="btn" to={`/${id}/checklist`}>
              Checklist
            </Link>
          </div>
          <div className={styles["details-planner-content-wrapper"]}>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Total tasks:
              </span>
              {planner.totalTasks}
            </p>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Done tasks:
              </span>
              {planner.totalDoneTasks}
            </p>
          </div>
        </div>
        <div
          className={`${styles["details-planner-section"]} ${styles["details-planner-border"]}`}
        >
          <h4 className={styles["details-planner-section-title"]}>
            Plan the big day
          </h4>
          <div className={styles["details-planner-btns-wrapper"]}>
            <Link className="btn" to={`/${id}/event`}>
              Plan
            </Link>
          </div>
          <div className={styles["details-planner-content-wrapper"]}>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Total events:
              </span>
              {planner.totalEvents}
            </p>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Highlighted events:
              </span>
              {planner.highlightedEvents}
            </p>
          </div>
        </div>
        <div
          className={`${styles["details-planner-section"]} ${styles["details-planner-border"]}`}
        >
          <h4 className={styles["details-planner-section-title"]}>My Notes</h4>
          <div className={styles["details-planner-btns-wrapper"]}>
            <Link className="btn" to={`/${id}/note`}>
              Notes
            </Link>
          </div>
          <div className={styles["details-planner-content-wrapper"]}>
            <p className={styles["details-planner-content"]}>
              <span className={styles["details-planner-title"]}>
                Total notes:
              </span>
              {planner.notes}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailsPlanner;
