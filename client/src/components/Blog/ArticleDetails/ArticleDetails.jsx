import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as articlesService from '../../../services/articles';

import Jumbotron from '../../shared/Jumbotron/Jumbotron';

import styles from './ArticleDetails.module.css';

function ArticleDetails() {
    //todo test search/filter article again!!!!
    //todo add comments
    //todo add like/dislike

    const navigate = useNavigate();
    const [article, setArticle] = useState({});
    const { id, page } = useParams();

    useEffect(() => {
        articlesService
            .getById(id)
            .then((res) => {
                console.log(res);
                setArticle(res);
            })
            .catch((err) => console.error(err));
    }, []);

    const onBackHandler = () => {
        navigate(`/blog?page=${page}`);
    }

    return (
        <section className={styles["article-details"]}>
            <Jumbotron
                pathToImage={article.jumboImage}
                isHomePage={false}
            />
            <h1 className={styles["article-details-title"]}>{article.title}</h1>
            <div className={styles["article-details-main-content-wrapper"]}>
                <div className="article-details-list-image">
                    <img className={styles["article-details-image"]} src={article.image} alt={article.title} />
                    <ul className={styles["article-details-ul"]}>
                        <li className={styles["article-details-li"]}>
                            <span className={styles["article-details-li-span"]}> Category:</span>
                            <img src={article.category?.image} alt={article.category?.name} />
                            {article.category?.name}
                        </li>
                        <li className={styles["article-details-li"]}>
                            <span className={styles["article-details-li-span"]}>Likes:</span>
                            {article.likes}
                        </li>
                        <li className={styles["article-details-li"]}>
                            <span className={styles["article-details-li-span"]}>Date:</span>
                            {article.createdAt}
                        </li>
                    </ul>
                </div>
                <div className={styles["article-details-content"]}>
                    <p className={styles["article-details-bold-content"]}>{article.shortContent}</p>
                    <p className="article-details-content-text">{article.content}</p>
                </div>
            </div>
            <button className="btn" onClick={onBackHandler}>Back</button>
        </section >
    );
}

export default ArticleDetails;