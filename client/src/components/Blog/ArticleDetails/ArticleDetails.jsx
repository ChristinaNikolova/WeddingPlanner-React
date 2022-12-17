import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as articlesService from '../../../services/articles';
import { AuthContext } from '../../../contexts/authContext';

import Jumbotron from '../../shared/Jumbotron/Jumbotron';

import styles from './ArticleDetails.module.css';

function ArticleDetails() {
    //todo test search/filter article again!!!!
    //todo add comments
    //todo add like/dislike + test
    //todo refactor object fit cover + shadow

    const { userId, isAdmin } = useContext(AuthContext);
    const { id, page } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [hasToScroll, setHasToScroll] = useState(true);

    useEffect(() => {
        articlesService
            .getById(id)
            .then((res) => {
                setArticle(res);
                setIsLiked(setIsLikedHelper(res.likes));

                if (hasToScroll) {
                    window.scrollTo(0, 0);
                    setHasToScroll(true);
                }
            })
            .catch((err) => console.error(err));
    }, [isLiked]);

    const onBackHandler = () => {
        navigate(`/blog?page=${page}`);
    }

    const onDeleteHandler = () => {
        articlesService
            .deleteById(id)
            .then(() => {
                onBackHandler();
            })
            .catch((err) => console.error(err));
    }

    const like = () => {
        articlesService
            .like(id)
            .then((res) => {
                setIsLiked(setIsLikedHelper(res.likes));
                setHasToScroll(false);
            })
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
                        {isAdmin &&
                            <li className={styles["article-details-li"]}>
                                <Link to={`/administration/articles/edit/${id}`} state={{ page: page }}>
                                    <i className="fa-solid fa-pen"></i>
                                </Link>
                                <i onClick={onDeleteHandler} className="fa-solid fa-trash"></i>
                            </li>
                        }
                    </ul>
                </div>
                <div className={styles["article-details-content"]}>
                    <p className={styles["article-details-bold-content"]}>{article.shortContent}</p>
                    {article.content?.map((el, i) => <p key={i} className={styles["article-details-content-text"]}>{el}</p>)}
                </div>
            </div>
            <div className={styles["article-details-btn-wrapper"]}>
                <button className="btn" onClick={onBackHandler}>Back</button>
            </div>
        </section >
    );
}

export default ArticleDetails;