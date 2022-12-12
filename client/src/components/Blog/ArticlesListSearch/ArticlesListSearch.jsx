import Input from '../../shared/Tags/Input/Input';

import styles from './ArticlesListSearch.module.css';

function ArticlesListSearch({ isSearchIconClicked, query, onShowSearchForm, onSearch, changeHandler }) {
    return (
        <span className={styles["articles-list-search-title"]}>
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
    );
}

export default ArticlesListSearch;