import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as helpers from '../../../../utils/helpers/form';
import * as validator from '../../../../utils/validators/article'
import * as articlesService from '../../../../services/articles';

import Input from '../../../shared/Input/Input';
import TextArea from '../../../shared/TextArea/TextArea';
import ClientError from '../../../shared/ClientError/ClientError';
import ServerError from '../../../shared/ServerError/ServerError';

import styles from './CreateArticle.module.css';

function CreateArticle() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        title: '',
        content: '',
        image: '',
        category: '',
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [imageError, setImageError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        checkDisabled();
    }, [values, titleError, contentError, imageError, categoryError]);

    const submitHandler = (e) => {
        e.preventDefault();

        setTitleError(validator.validTitle(values.title));
        setContentError(validator.validContent(values.content));
        setImageError(validator.validImage(values.image));
        setCategoryError(validator.validCategory(values.category));

        if (titleError || contentError || imageError || categoryError) {
            return;
        }

        // todo validate url
        // todo refactor css

        articlesService.create(values.title, values.content, values.image, values.category)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        // categoriesService.create(values.name, values.image)
        //     .then((data) => {
        //         if (data.message) {
        //             setServerError(data.message);
        //             return;
        //         }

        //         navigate('/');
        //     })
        //     .catch((err) => console.error(err));
    }

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    const validateTitle = () => {
        setTitleError(validator.validTitle(values.title));
    }

    const validateContent = () => {
        setContentError(validator.validContent(values.content));
    }

    const validateImage = () => {
        setImageError(validator.validImage(values.image));
    }

    const validateCatagory = () => {
        setCategoryError(validator.validCategory(values.category));
    }

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [titleError, contentError, imageError, categoryError]));
    };

    return (
        <section className="section section-background">
            {serverError && <ServerError errors={serverError} />}
            <div className="section-title-wrapper">
                <h2 className="section-title">Create Article</h2>
            </div>
            <div className={styles["create-article-content-wrapper"]} >
                <form className={styles["create-article-form"]} onSubmit={submitHandler}>
                    <div className="form-wrapper">
                        <Input
                            name="title"
                            type="text"
                            label="Title"
                            value={values.title}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateTitle}
                        />
                        {titleError && <ClientError error={titleError} />}
                    </div>
                    <div className="form-wrapper">
                        <TextArea
                            name="content"
                            label="Content"
                            value={values.content}
                            cols="30"
                            rows="16"
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateContent}
                        />
                        {contentError && <ClientError error={contentError} />}
                    </div>
                    <div className="form-wrapper">
                        <Input
                            name="image"
                            type="text"
                            label="Image"
                            value={values.image}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateImage}
                        />
                        {imageError && <ClientError error={imageError} />}
                    </div>
                    <div className="form-wrapper">
                        <Input
                            name="category"
                            type="text"
                            label="Category"
                            value={values.category}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateCatagory}
                        />
                        {categoryError && <ClientError error={categoryError} />}
                    </div>
                    <button className="btn btn-center" disabled={isDisabled}>Create</button>
                </form>
            </div>
        </section>
    );
}

export default CreateArticle;