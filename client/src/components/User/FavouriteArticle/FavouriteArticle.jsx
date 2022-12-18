import { useEffect, useState } from "react";

import * as usersService from '../../../services/users';
import ArticleSingle from "../../Blog/ArticleSingle/ArticleSingle";
import Jumbotron from "../../shared/Jumbotron/Jumbotron";

import styles from './FavouriteArticle.module.css';

function FavouriteArticle({ pathToImage }) {
    const [favArticles, setFavArticles] = useState([]);

    useEffect(() => {
        usersService
            .getFav()
            .then((res) => setFavArticles(res))
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className={styles["articles-all"]}>
            <Jumbotron
                pathToImage={pathToImage}
                isHomePage={false}
            />
            <div className={styles["articles-all-title-wrapper"]}>
                <h4 className={styles["articles-all-title"]}>Wedding Blog</h4>
                <p className={styles["article-all-content-text"]}>You don't marry the person you can live with, you marry the person you can't live without.</p>
            </div>
            {
                favArticles.length
                    ? <div className={styles["articles-list-blog"]}>
                        {favArticles.map((a, i) =>
                            <ArticleSingle
                                key={a.id}
                                id={a.id}
                                className={i % 2 === 0 ? 'left' : 'right'}
                                title={a.title}
                                image={a.image}
                                shortContent={a.shortContent}
                                createdAt={a.createdAt}
                                categoryName={a.category.name}
                            />)
                        }
                    </div>
                    : <p className={styles["articles-list-empty"]}>No Articles Yet</p>
            }
        </section>
    );
}

export default FavouriteArticle;