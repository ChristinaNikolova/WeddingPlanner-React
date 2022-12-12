import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as articlesService from '../../../services/articles';
import { directions } from '../../../utils/constants/global';

import Jumbotron from "../../shared/Jumbotron/Jumbotron";
import Pagination from "../../shared/Pagination/Pagination";
import ArticleSingle from "../ArticleSingle/ArticleSingle";
import ArticlesListCategoryDropDown from '../ArticlesListCategoryDropDown/ArticlesListCategoryDropDown';
import ArticlesListSearch from '../ArticlesListSearch/ArticlesListSearch';

import styles from './ArticlesList.module.css';

function ArticlesList({ pathToImage }) {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
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
            <div className={styles["articles-list-forms-wrapper"]}>
                <ArticlesListSearch
                    isSearchIconClicked={isSearchIconClicked}
                    query={query}
                    onShowSearchForm={onShowSearchForm}
                    onSearch={onSearch}
                    changeHandler={changeHandler}
                />

                <ArticlesListCategoryDropDown
                    selectedCategoryName={selectedCategory.name}
                    onCategoryHandler={onCategoryHandler}
                    onRemoveCategotyHandler={onRemoveCategotyHandler}
                />
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