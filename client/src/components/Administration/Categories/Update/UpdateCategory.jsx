import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as categoriesService from '../../../../services/categories';

import FormCategory from '../Form/FormCategory';

function UpdateCategory() {
    const formName = 'Update';
    const navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        categoriesService
            .getById(id)
            .then((data) => setCategory(data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
    }, [serverError]);

    const submitHandler = (name, image) => {
        categoriesService.update(id, name, image)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelFormHandler();
            })
            .catch((err) => console.error(err));
    };

    const onCancelFormHandler = () => {
        navigate('/administration/categories');
    }

    if (!category.name || !category.image) {
        return null;
    }

    return (
        <FormCategory
            formName={formName}
            name={category.name}
            image={category.image}
            serverError={serverError}
            onSubmitHandler={submitHandler}
            onCancelFormHandler={onCancelFormHandler}
        />
    );
}

export default UpdateCategory;