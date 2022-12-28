import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import * as articlesService from '../../../services/articles';
import { directions } from '../../../utils/constants/global';
import { scrollToTop } from '../../../utils/helpers/form';

import Jumbotron from '../../shared/Jumbotron/Jumbotron';
import Pagination from '../../shared/Pagination/Pagination';
import ArticlesList from '../AllriclesList/ArticlesList';
import ArticlesAllCategoryDropDown from '../ArticlesAllCategoryDropDown/ArticlesAllCategoryDropDown';
import ArticlesAllSearch from '../ArticlesAllSearch/ArticlesAllSearch';

import styles from './ArticlesAll.module.css';

function ArticlesAll({ pathToImage }) {
    const [searchParams] = useSearchParams();
    const page = searchParams?.get('page') ? searchParams.get('page') : '1';

    const location = useLocation();
    const { state } = location;

    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id: state?.category.id ? state.category.id : 'default',
        name: state?.category.name ? state.category.name : 'all',
    });
    const [currentPage, setCurrentPage] = useState(page);
    const [pagesCount, setPagesCount] = useState(1);
    const [hasToScroll, setHasToScroll] = useState(false);
    const [hasToNavigate, setHasToNavigate] = useState(false);

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
                    scrollToTop();
                    setHasToScroll(false);
                }

                if (hasToNavigate) {
                    startPageHelper();
                    setHasToNavigate(false);
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

    const onChangeHandler = (e) => {
        setQuery(e.target.value);
    }

    const onCategoryHandler = (e) => {
        setSelectedCategory({
            id: e.target.id,
            name: e.target.innerText,
        });
        setHasToNavigate(true);
    }

    const onRemoveCategotyHandler = (e) => {
        e.stopPropagation();
        setSelectedCategory({
            id: 'default',
            name: 'all',
        });
        setHasToNavigate(true);
    }

    const startPageHelper = () => {
        navigate(`/blog?page=1&category=${selectedCategory.name}`);
        setCurrentPage(1);
    }

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
            <div className={styles["articles-all-forms-wrapper"]}>
                <ArticlesAllSearch
                    isSearchIconClicked={isSearchIconClicked}
                    query={query}
                    onShowSearchForm={onShowSearchForm}
                    onSearch={onSearch}
                    onChangeHandler={onChangeHandler}
                />

                <ArticlesAllCategoryDropDown
                    selectedCategoryName={selectedCategory.name}
                    onCategoryHandler={onCategoryHandler}
                    onRemoveCategotyHandler={onRemoveCategotyHandler}
                />
            </div>
            <ArticlesList
                articles={articles}
                currentPage={currentPage}
                selectedCategory={selectedCategory}
            />
            <Pagination
                currentPage={currentPage}
                pagesCount={pagesCount}
                selectedCategory={selectedCategory}
                onClickHandler={onPaginationHandler}
            />
        </section >
    );
}

export default ArticlesAll;