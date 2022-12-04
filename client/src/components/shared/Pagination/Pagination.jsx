import { Link } from 'react-router-dom';

import { directions } from '../../../utils/constants/global';

import styles from './Pagination.module.css';

function Pagination({ currentPage, pagesCount, onClickHandler }) {
    return (
        <div className={styles["pagination-warpper"]}>
            {currentPage !== 1 &&
                <Link className={styles["pagination"]} to={`/blog/${currentPage - 1}`} onClick={() => onClickHandler(directions.PREV)}>
                    Newer posts
                </Link>
            }
            {currentPage !== pagesCount &&
                <Link className={styles["pagination"]} to={`/blog/${currentPage + 1}`} onClick={() => onClickHandler(directions.NEXT)}>
                    Older posts
                </Link>
            }
        </div>
    );
}

export default Pagination;