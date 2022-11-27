import { useState, useEffect } from "react";

import * as categoriesService from '../../../../services/categories';
import SingleCategory from "../SingleCategory/SingleCategory";

import styles from './AllCategories.module.css';

function AllCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesService
            .all()
            .then((res) => setCategories(res))
            .catch((err) => console.error(err));
    }, []);

    const onDeleteHandler = (id) => {
        console.log(id);
    }

    return (
        <section className="section section-background">
            {/* {serverError && <ServerError errors={serverError} />} */}
            <div className="section-title-wrapper">
                <h2 className="section-title">All Category</h2>
            </div>
            <div>
                <ul className={styles["all-categories-ul"]}>
                    {categories.map((c) =>
                        <SingleCategory
                            key={c.id}
                            id={c.id}
                            name={c.name}
                            image={c.image}
                            onDeleteHandler={onDeleteHandler}
                        />
                    )}
                </ul>
            </div>
        </section>
    );
}

export default AllCategories;