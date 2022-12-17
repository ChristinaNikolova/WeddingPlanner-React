import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";

import * as articlesService from '../../../../services/articles';

import FormArticle from "../Form/FormArticle";

function UpdateArticle() {
    const formName = 'Update';
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const { state } = location;

    const [article, setArticle] = useState({});
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        articlesService
            .getById(id)
            .then((data) => setArticle(data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
    }, [serverError]);

    const submitHandler = (title, content, image, jumboImage, category) => {
        articlesService.update(id, title, content, image, jumboImage, category)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelHandler();
            })
            .catch((err) => console.error(err));
    };

    const onCancelHandler = () => {
        navigate(`/blog/${state.page}/${id}`);
    }

    if (!article.title || !article.content || !article.image || !article.jumboImage || !article.category) {
        return null;
    }

    return (
        <FormArticle
            formName={formName}
            title={article.title}
            content={article.content.join(' ')}
            image={article.image}
            jumboImage={article.jumboImage}
            category={article.category}
            serverError={serverError}
            onSubmitHandler={submitHandler}
            onCancelHandler={onCancelHandler}
        />
    );
}

export default UpdateArticle;