import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as plannersService from "../../../services/planners";
import * as constants from "../../../utils/constants/images";

import Bottom from "../../shared/Images/Bottom/Bottom";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const [planners, setPlanners] = useState([]);

  useEffect(() => {
    plannersService
      .all()
      .then((res) => setPlanners(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id={styles["dashboard"]} className="dashboard section-background">
      <div className="section-title-wrapper">
        <h2 className="section-title">Plan you wedding</h2>
      </div>
      <div className={styles["dashboard-content-wrapper"]}>
        <div className={styles["dashboard-left-wrapper"]}>
          <h2 className={styles["dashboard-left-title"]}>My planners</h2>
          {planners.length ? (
            planners.map((p) => (
              <Link
                className={styles["dashboard-left-link"]}
                to={`/plan/${p.id}`}
                key={p.id}
              >
                <i className="fa-solid fa-heart"></i>
                {p.title}
              </Link>
            ))
          ) : (
            <p className={styles["dashboard-left-no-planners"]}>
              No planners yet
            </p>
          )}
        </div>
        <div className={styles["dashboard-right-wrapper"]}>
          <Link to="/plan/create" className="btn">
            Create new planner
          </Link>
        </div>
      </div>
      <Bottom
        first={constants.bottom.FIRST}
        second={constants.bottom.SECOND}
        third={constants.bottom.THIRD}
      />
    </section>
  );
}

export default Dashboard;
