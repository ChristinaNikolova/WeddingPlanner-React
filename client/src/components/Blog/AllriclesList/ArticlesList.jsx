import ArticleSingle from '../ArticleSingle/ArticleSingle';

import styles from './ArticlesList.module.css';

function ArticlesList({ articles, currentPage, selectedCategory }) {
    return (<>
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
                            currentPage={currentPage}
                            selectedCategory={selectedCategory}
                        />)
                    }
                </div>
                : <p className={styles["articles-list-empty"]}>No Articles Yet</p>
        }
    </>);
}

export default ArticlesList