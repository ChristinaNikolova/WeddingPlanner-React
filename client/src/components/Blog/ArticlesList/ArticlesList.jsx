import { useEffect, useState } from "react";

import * as articlesService from '../../../services/articles';

import Jumbotron from "../../shared/Jumbotron/Jumbotron";

import styles from './ArticlesList.module.css';


function ArticlesList({ pathToImage }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        articlesService
            .all()
            .then((data) => setArticles(data))
            .catch((err) => console.error(err));
    }, []);

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
            <div className={styles["articles-list-categories-wrapper"]}>
                <span className={styles["articles-list-blog-title"]}>Blog</span>
                <div>
                    <span className="articles-list-categories">Category:</span>
                    <span className="articles-list-categories-drop-down"></span>
                </div>
            </div>
            <div className="articles-list-blog">
                {articles.map((a) => <div key={a.id}>{a.title}: {a.category.id}: {a.category.name}</div>)}
            </div>
        </section>
    );
}

export default ArticlesList;