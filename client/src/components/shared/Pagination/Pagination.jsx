import { Link } from 'react-router-dom';

import { directions } from '../../../utils/constants/global';

import styles from './Pagination.module.css';

function Pagination({ currentPage, pagesCount, selectedCategory, onClickHandler }) {
    return (
        <div className={styles["pagination-warpper"]}>
            {currentPage !== 1 &&
                <Link className={styles["pagination"]} to={`/blog?page=${currentPage - 1}&category=${selectedCategory.name}`} onClick={() => onClickHandler(directions.PREV)}>
                    Newer posts
                </Link>
            }
            {currentPage !== pagesCount &&
                <Link className={styles["pagination"]} to={`/blog?page=${currentPage + 1}&category=${selectedCategory.name}`} onClick={() => onClickHandler(directions.NEXT)}>
                    Older posts
                </Link>
            }
        </div>
    );
}

export default Pagination;