import { Link } from 'react-router-dom';

import * as constants from '../../../../utils/constants/article';

import styles from './SingleCategory.module.css'

function SingleCategory({ id, name, image, onDeleteHandler }) {
    return (
        <li className={styles["all-categories-li"]}>
            <img src={image} alt={name} className={styles["all-categories-img"]} />
            {name}
            <Link to={`/administration/categories/edit/${id}`}><i className="fa-solid fa-pen"></i></Link>
            {id !== constants.article.DEFAULT_CATEGORY_SELECTED_ID && <i className="fa-solid fa-trash" onClick={() => onDeleteHandler(id)}></i>}
        </li>
    );
}

export default SingleCategory;