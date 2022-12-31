import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as articlesService from '../../../../services/articles';
import { formNames } from '../../../../utils/constants/global';

import FormArticle from '../Form/FormArticle';

function CreateArticle() {
    const formName = formNames.CREATE;
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

    const onCancelFormHandler = () => {
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
            onCancelFormHandler={onCancelFormHandler}
        />
    );
}

export default CreateArticle;