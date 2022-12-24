import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as articlesService from '../../../../services/articles';

import FormArticle from '../Form/FormArticle';

function CreateArticle() {
    const formName = 'Create';
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    useEffect(() => {
    }, [serverError]);

    const submitHandler = (title, content, image, jumboImage, category) => {
        articlesService.create(title, content, image, jumboImage, category)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                navigate(`/blog/${data._id}`);
            })
            .catch((err) => console.error(err));
    }

    const onCancelHandler = () => {
        navigate(`/blog`);
    }

    return (
        <FormArticle
            formName={formName}
            title={''}
            content={''}
            image={''}
            jumboImage={''}
            category={''}
            serverError={serverError}
            onSubmitHandler={submitHandler}
            onCancelHandler={onCancelHandler}
        />
    );
}

export default CreateArticle;