import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as articlesService from '../../../services/articles';
import { AuthContext } from '../../../contexts/authContext';

import Jumbotron from '../../shared/Jumbotron/Jumbotron';

import styles from './ArticleDetails.module.css';

function ArticleDetails() {
    //todo test search/filter article again!!!!
    //todo add comments
    //todo add like/dislike + test
    //todo refactor object fit cover

    const { userId } = useContext(AuthContext);
    const { id, page } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState({});
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        articlesService
            .getById(id)
            .then((res) => {
                setArticle(res);
                setIsLiked(setIsLikedHelper(res.likes));
            })
            .catch((err) => console.error(err));
    }, [isLiked]);

    const onBackHandler = () => {
        navigate(`/blog?page=${page}`);
    }

    const like = () => {
        articlesService
            .like(id)
            .then((res) => setIsLiked(setIsLikedHelper(res.likes)))
            .catch((err) => console.error(err));
    }

    const setIsLikedHelper = (likes) => {
        return likes.includes(userId)
    }

    return (
        <section className={styles["article-details"]}>
            <Jumbotron
                pathToImage={article.jumboImage}
                isHomePage={false}
            />
            <h1 className={styles["article-details-title"]}>{article.title}</h1>
            <div className={styles["article-details-btn-wrapper"]}>
                <button className="btn" onClick={onBackHandler}>Back</button>
            </div>
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
                            <span className={styles["article-details-li-span"]}>Date:</span>
                            {article.createdAt}
                        </li>
                        <li className={styles["article-details-li"]}>
                            <span className={styles["article-details-li-span"]}>Likes:</span>
                            {article.likesCount}
                            {isLiked
                                ? <i onClick={like} className="fa-solid fa-heart"></i>
                                : <i onClick={like} className="fa-regular fa-heart"></i>
                            }
                        </li>
                    </ul>
                </div>
                <div className={styles["article-details-content"]}>
                    <p className={styles["article-details-bold-content"]}>{article.shortContent}</p>
                    <p className="article-details-content-text">{article.content}</p>
                </div>
            </div>
            <div className={styles["article-details-btn-wrapper"]}>
                <button className="btn" onClick={onBackHandler}>Back</button>
            </div>
        </section >
    );
}

export default ArticleDetails;