import { useEffect, useState } from "react"

import * as categoriesService from '../../../services/categories';
import * as constants from '../../../utils/constants/article';
import { toogle } from "../../../utils/helpers/dropdown";

import styles from './ArticlesAllCategoryDropDown.module.css';

function ArticlesAllCategoryDropDown({ selectedCategoryName, onCategoryHandler, onRemoveCategotyHandler }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesService
            .all()
            .then((res) => {
                res = res.filter((el) => el.id !== constants.article.DEFAULT_CATEGORY_SELECTED_ID);
                setCategories(res)
            })
            .catch((err) => console.error(err));
    }, []);

    const onToogleHandler = (e) => {
        const dropdownElement = e.target.nextElementSibling;

        dropdownElement.classList.contains('show')
            ? toogle(dropdownElement, 'show', 'hide')
            : toogle(dropdownElement, 'hide', 'show');
    }

    const onClickCategoryHandler = (e) => {
        toogle(e.target.parentElement, 'show', 'hide');
        onCategoryHandler(e);
    }

    return (
        <div className={styles["article-all-category-drop-down-wrapper"]}>
            <span className={styles["articles-all-category-drop-down"]}>Category:</span>
            <button onClick={onToogleHandler} className={styles["articles-all-category-drop-down-btn"]}>
                {selectedCategoryName}
                {selectedCategoryName !== 'all' && <i onClick={(e) => onRemoveCategotyHandler(e)} className="fa-solid fa-xmark"></i>}
            </button>
            <ul className={[styles["articles-all-category-drop-down-ul"], "hide"].join(' ')}>
                {categories.map((c) =>
                    <li
                        key={c.id}
                        id={c.id}
                        className={styles["articles-all-category-drop-down-li"]}
                        onClick={(e) => onClickCategoryHandler(e)}>
                        {c.name}
                    </li>)
                }
            </ul>
        </div>
    );
}

export default ArticlesAllCategoryDropDown;