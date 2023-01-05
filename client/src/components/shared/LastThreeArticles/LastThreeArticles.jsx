import { useState, useEffect } from 'react';

import * as articlesService from '../../../services/articles';

import styles from './LastThreeArticles.module.css';

function LastThreeArticles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        articlesService
            .getLastThree()
            .then((res) => setArticles(res))
            .catch((err) => console.error(err));
    }, []);

    console.log(articles);

    return (
        <h1>HI</h1>
    );
}

export default LastThreeArticles;