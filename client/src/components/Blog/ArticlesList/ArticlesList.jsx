import { useEffect, useState } from "react";

import * as articlesService from '../../../services/articles';

import Jumbotron from "../../shared/Jumbotron/Jumbotron";


function ArticlesList({ pathToImage }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        articlesService
            .all()
            .then((data) => setArticles(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="section">
            <Jumbotron pathToImage={pathToImage} />
            <div>
                {articles.map((a) => <div key={a.id}>{a.title}: {a.category.id}: {a.category.name}</div>)}
            </div>
        </section>
    );
}

export default ArticlesList;