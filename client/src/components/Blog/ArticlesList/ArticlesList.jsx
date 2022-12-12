import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as articlesService from '../../../services/articles';
import * as categoriesService from '../../../services/categories';
import { directions } from '../../../utils/constants/global';
import { toogle } from "../../../utils/helpers/dropdown";

import Jumbotron from "../../shared/Jumbotron/Jumbotron";
import Pagination from "../../shared/Pagination/Pagination";
import ArticleSingle from "../ArticleSingle/ArticleSingle";
import Input from '../../shared/Tags/Input/Input';

import styles from './ArticlesList.module.css';

function ArticlesList({ pathToImage }) {
    //TODO refactor
    //TODO test no article -> category/query
    //TODO need a form???
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id: 'default',
        name: 'all',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [hasToScroll, setHasToScroll] = useState(false);

    const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
    const [query, setQuery] = useState('');
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        articlesService
            .all(currentPage, selectedCategory.id, query)
            .then((data) => {
                setArticles(data.articles);
                setCurrentPage(Number(data.currentPage));
                setPagesCount(data.pagesCount);
                setIsSearched(false);

                if (hasToScroll) {
                    window.scrollTo(0, 0);
                    setHasToScroll(false);
                }
            })
            .catch((err) => console.error(err));
    }, [currentPage, selectedCategory, isSearched, isSearchIconClicked]);

    useEffect(() => {
        categoriesService
            .all()
            .then((res) => setCategories(res))
            .catch((err) => console.error(err));
    }, []);

    const onToogleHandler = (e) => {
        const dropdownElement = e.target.nextElementSibling;

        dropdownElement.classList.contains('show')
            ? toogle(dropdownElement, 'show', 'hide')
            : toogle(dropdownElement, 'hide', 'show');
    }

    const onPaginationHandler = (direction) => {
        const value = direction === directions.PREV ? -1 : 1;
        setCurrentPage(currentPage + value);
        setHasToScroll(true);
    }

    const onShowSearchForm = () => {
        setIsSearchIconClicked(!isSearchIconClicked);
        setIsSearched(false);
        setQuery('');
    }

    const onSearch = () => {
        setIsSearched(true);
        startPageHelper();
    }

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }

    const onCategoryHandler = (e) => {
        startPageHelper();
        setSelectedCategory({
            id: e.target.id,
            name: e.target.innerText,
        });
        toogle(e.target.parentElement, 'show', 'hide')
    }

    const onRemoveCategotyHandler = (e) => {
        e.stopPropagation();
        startPageHelper();
        setSelectedCategory({
            id: 'default',
            name: 'all',
        });
    }

    const startPageHelper = () => {
        navigate('/blog?page=1');
        setCurrentPage(1);
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
            <div className={styles["articles-list-categories-wrapper"]}>
                <span className={styles["articles-list-blog-title"]}>
                    Search
                    {isSearchIconClicked
                        ? <>
                            <Input
                                name="search"
                                type="text"
                                label=""
                                value={query}
                                onChangeHandler={changeHandler} />
                            <i onClick={onSearch} className="fa-solid fa-magnifying-glass"></i>
                            <i onClick={onShowSearchForm} className="fa-solid fa-xmark"></i>
                        </>
                        : <i onClick={onShowSearchForm} className="fa-solid fa-magnifying-glass" style={{
                            position: "absolute",
                            top: "18px"
                        }}></i>
                    }
                </span>
                <div className={styles["article-list-drop-down-wrapper"]}>
                    <span className={styles["articles-list-categories"]}>Category:</span>
                    <button onClick={onToogleHandler} className={styles["articles-list-categories-drop-down-btn"]}>
                        {selectedCategory.name}
                        {selectedCategory.name !== 'all' && <i onClick={(e) => onRemoveCategotyHandler(e)} className="fa-solid fa-xmark"></i>}
                    </button>
                    <ul className={[styles["articles-list-categories-drop-down-ul"], "hide"].join(' ')}>
                        {categories.map((c) =>
                            <li
                                key={c.id}
                                id={c.id}
                                className={styles["articles-list-categories-drop-down-li"]}
                                onClick={onCategoryHandler}>
                                {c.name}
                            </li>)
                        }
                    </ul>
                </div>
            </div>
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
                onClickHandler={onPaginationHandler}
            />
        </section >
    );
}

export default ArticlesList;