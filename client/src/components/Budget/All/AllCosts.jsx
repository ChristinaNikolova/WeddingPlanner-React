import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as categoriesService from '../../../services/categories';
import * as costsService from '../../../services/costs';

import styles from './AllCosts.module.css';

function AllCosts() {
    //todo check for border radius
    //todo add css classes to categorories images
    //todo remoce "plaese select category"
    const { id: plannerId } = useParams();
    const [categories, setCategories] = useState([]);
    const [costs, setCosts] = useState([]);

    useEffect(() => {
        categoriesService
            .all()
            .then((res) => setCategories(res))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        costsService
            .all(plannerId)
            .then((res) => setCosts(res))
            .catch((err) => console.error(err));
    }, []);

    console.log(categories);
    console.log(costs);

    return (
        <section className="section-planner section-background">
            <div className="section-title-wrapper">
                <h2 className="section-title">Budget</h2>
            </div>
            <div className={styles["budget-info-wrapper"]}>
                <p className="budget-info-target">
                    <span className="budget-info-target-name">Budget:</span>
                </p>
                <p className="budget-info-actual">
                    <span className="budget-info-actual-name">Actual total:</span>
                </p>
            </div>
            <div className={styles["budget-main-content-wrapper"]}>
                {categories.map((c) =>
                    <div key={c.id} className={styles["budget-main-current-category-wrapper"]}>
                        <img className={styles["budget-main-current-category-image"]} src={c.image} alt={c.name} />
                        <span className={styles["budget-main-current-category-name"]}>{c.name}</span>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AllCosts;