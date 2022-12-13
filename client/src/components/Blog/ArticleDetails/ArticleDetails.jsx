import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as articlesService from '../../../services/articles';

import Jumbotron from '../../shared/Jumbotron/Jumbotron';

import styles from './ArticleDetails.module.css';

function ArticleDetails({ pathToImage }) {
    //todo test search/filter article again!!!!
    
    const [article, setArticle] = useState({});
    const { id } = useParams();

    useEffect(() => {
        articlesService
            .getById(id)
            .then((res) => {
                console.log(res);
                setArticle(res);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section>
            <Jumbotron
                pathToImage={pathToImage}
                isHomePage={false}
            />
        </section >
    );
}

export default ArticleDetails;