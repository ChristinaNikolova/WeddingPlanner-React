import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as articlesService from '../../../services/articles';

import styles from './LastThreeArticles.module.css';

function LastThreeArticles() {
    //todo fix section height

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        articlesService
            .getLastThree()
            .then((res) => setArticles(res))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className={styles["last-three-articles-section-wrapper"]}>
            <h3 className={styles["last-three-artilces-title"]}>Recent articles</h3>
            <div className={styles["last-three-articles-wrapper"]}>
                {articles.map((a) =>
                    <div key={a.id} className={styles["last-three-articles-current-article-wrapper"]}>
                        <img className={`${styles["last-three-articles-current-article-image"]} img img-shadow`} src={a.image} alt={a.title} />
                        <h5 className={styles["last-three-articles-current-article-title"]}>{a.title}</h5>
                        <p className={styles["last-three-articles-current-article-short-content"]}>{a.shortContent}</p>
                        <Link className="btn" to={`/blog/${a.id}`}>Read more</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LastThreeArticles;