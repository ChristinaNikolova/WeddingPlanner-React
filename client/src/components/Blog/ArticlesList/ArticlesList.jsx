import { useEffect, useState } from "react";

import * as articlesService from '../../../services/articles';

import Jumbotron from "../../shared/Jumbotron/Jumbotron";
import ArticleSingle from "../ArticleSingle/ArticleSingle";

import styles from './ArticlesList.module.css';

function ArticlesList({ pathToImage }) {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);

    useEffect(() => {
        articlesService
            .all(currentPage)
            .then((data) => {
                setArticles(data.articles);
                setCurrentPage(Number(data.currentPage));
                setPagesCount(data.pagesCount);
            })
            .catch((err) => console.error(err));
    }, [currentPage]);

    return (
        <section className={styles["articles-list"]}>
            <Jumbotron
                pathToImage={pathToImage}
                isHomePage={false}
            />
            <div className={styles["articles-list-title-wrapper"]}>
                <h4 className={styles["articles-list-title"]}>Wedding Blog</h4>
                <p className={styles["article-list-content-text"]}>You don't marry the person you can live with, you marry the person you can't live without.</p>
            </div>
            {!!articles.length &&
                <div className={styles["articles-list-categories-wrapper"]}>
                    <span className={styles["articles-list-blog-title"]}>Blog</span>
                    <div>
                        <span className="articles-list-categories">Category:</span>
                        <span className="articles-list-categories-drop-down"></span>
                    </div>
                </div>
            }
            {articles.length
                ? <div className={styles["articles-list-blog"]}>
                    {articles.map((a, i) =>
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
            <div className={styles["test"]}>
                {currentPage !== 1 && <p>Pres</p>}
                {currentPage !== pagesCount && <p>Next</p>}
            </div>
        </section>
    );
}

export default ArticlesList;