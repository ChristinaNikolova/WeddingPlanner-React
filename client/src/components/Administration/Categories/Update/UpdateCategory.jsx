import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as categoriesService from '../../../../services/categories';

function UpdateCategory() {
    const { id } = useParams();
    const [category, setCategory] = useState({});

    useEffect(() => {
        categoriesService
            .getById(id)
            .then((res) => setCategory(res))
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <h2>{category.name}</h2>
            <img src={category.image} alt={category.name} />
        </>
    );
}

export default UpdateCategory;