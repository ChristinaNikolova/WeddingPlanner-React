import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as articlesService from '../../../services/articles';
import * as categoriesService from '../../../services/categories';
import { directions } from '../../../utils/constants/global';

import Jumbotron from "../../shared/Jumbotron/Jumbotron";
import Pagination from "../../shared/Pagination/Pagination";
import ArticleSingle from "../ArticleSingle/ArticleSingle";

import styles from './ArticlesList.module.css';

function ArticlesList({ pathToImage }) {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id: '',
        name: 'All',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);

    useEffect(() => {
        articlesService
            .all(currentPage, selectedCategory.id)
            .then((data) => {
                setArticles(data.articles);
                setCurrentPage(Number(data.currentPage));
                setPagesCount(data.pagesCount);
                window.scrollTo(0, 0);
            })
            .catch((err) => console.error(err));
    }, [currentPage, selectedCategory]);

    useEffect(() => {
        categoriesService
            .all()
            .then((res) => setCategories(res))
            .catch((err) => console.error(err));
    }, []);

    const onToogleHandler = (e) => {
        const dropdownElement = e.target.nextElementSibling;

        dropdownElement.classList.contains('show')
            ? toogleHelper(dropdownElement, 'show', 'hide')
            : toogleHelper(dropdownElement, 'hide', 'show');
    }

    const onClickPaginationHandler = (direction) => {
        const value = direction === directions.PREV ? -1 : 1;
        setCurrentPage(currentPage + value);
    }

    const onClickCategoryHandler = (e) => {
        navigate('/blog?page=1');
        setCurrentPage(1);
        setSelectedCategory({
            id: e.target.id,
            name: e.target.innerHTML,
        });
        toogleHelper(e.target.parentElement, 'show', 'hide')
    }

    const toogleHelper = (element, remove, add) => {
        element.classList.remove(remove);
        element.classList.add(add);
    }

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
                    <div className={styles["article-list-drop-down-wrapper"]}>
                        <span className={styles["articles-list-categories"]}>Category:</span>
                        <button onClick={onToogleHandler} className={styles["articles-list-categories-drop-down-btn"]}>
                            {selectedCategory.name}
                        </button>
                        <ul className={[styles["articles-list-categories-drop-down-ul"], "hide"].join(' ')}>
                            {categories.map((c) =>
                                <li
                                    key={c.id}
                                    id={c.id}
                                    className={styles["articles-list-categories-drop-down-li"]}
                                    onClick={onClickCategoryHandler}>
                                    {c.name}
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            }
            {
                articles.length
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
            <Pagination
                currentPage={currentPage}
                pagesCount={pagesCount}
                onClickHandler={onClickPaginationHandler}
            />
        </section >
    );
}

export default ArticlesList;