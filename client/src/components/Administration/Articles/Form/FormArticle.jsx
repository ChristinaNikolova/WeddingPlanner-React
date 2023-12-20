import { useState, useEffect } from "react";

import { category as categoryModel } from "../../../../utils/constants/model";
import * as helpers from "../../../../utils/helpers/form";
import * as validator from "../../../../utils/validators/article";
import * as categoriesService from "../../../../services/categories";

import Input from "../../../shared/Tags/Input/Input";
import TextArea from "../../../shared/Tags/TextArea/TextArea";
import Select from "../../../shared/Tags/Select/Select";
import ClientError from "../../../shared/Errors/ClientError/ClientError";
import ServerError from "../../../shared/Errors/ServerError/ServerError";
import FormButton from "../../../shared/Buttons/Form/FormButton";

function FormArticle({
  formName,
  title,
  content,
  image,
  jumboImage,
  category,
  serverError,
  onSubmitHandler,
  onCancelFormHandler,
}) {
  const [values, setValues] = useState({
    title: title,
    content: content,
    image: image,
    jumboImage: jumboImage,
    category: category
      ? category.id
      : categoryModel.DEFAULT_CATEGORY_SELECTED_ID,
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [categories, setCategories] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [imageError, setImageError] = useState("");
  const [jumboImageError, setJumboImageError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    categoriesService
      .all()
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    checkDisabled();
  }, [
    values,
    titleError,
    contentError,
    imageError,
    jumboImageError,
    categoryError,
  ]);

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateTitle = () => {
    setTitleError(validator.validTitle(values.title));
  };

  const validateContent = () => {
    setContentError(validator.validContent(values.content));
  };

  const validateImage = () => {
    setImageError(validator.validImage(values.image));
  };

  const validateJumboImage = () => {
    setJumboImageError(validator.validImage(values.jumboImage));
  };

  const validateCatagory = () => {
    setCategoryError(validator.validCategory(values.category));
  };

  const checkDisabled = () => {
    setIsDisabled(
      helpers.isButtonDisabled(values, [
        titleError,
        contentError,
        imageError,
        jumboImageError,
        categoryError,
      ])
    );
  };

  const onSubmitHelperHandler = (e) => {
    e.preventDefault();

    setTitleError(validator.validTitle(values.title));
    setContentError(validator.validContent(values.content));
    setImageError(validator.validImage(values.image));
    setJumboImageError(validator.validImage(values.jumboImage));
    setCategoryError(validator.validCategory(values.category));

    if (
      titleError ||
      contentError ||
      imageError ||
      jumboImageError ||
      categoryError
    ) {
      return;
    }

    onSubmitHandler(
      values.title,
      values.content,
      values.image,
      values.jumboImage,
      values.category
    );
  };

  return (
    <section className="section-background">
      {serverError && <ServerError errors={serverError} />}
      <div className="section-title-wrapper">
        <h2 className="section-title">{formName} Article</h2>
      </div>
      <div className="form-wrapper-center">
        <form onSubmit={onSubmitHelperHandler} className="form-width">
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
              rows="16"
              onChangeHandler={changeHandler}
              onBlurHandler={validateContent}
            />
            {contentError && <ClientError error={contentError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="image"
              type="url"
              label="Image"
              value={values.image}
              onChangeHandler={changeHandler}
              onBlurHandler={validateImage}
            />
            {imageError && <ClientError error={imageError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="jumboImage"
              type="url"
              label="Jumbo Image"
              value={values.jumboImage}
              onChangeHandler={changeHandler}
              onBlurHandler={validateJumboImage}
            />
            {jumboImageError && <ClientError error={jumboImageError} />}
          </div>
          <div className="form-wrapper">
            <Select
              name="category"
              label="Category"
              value={values.category}
              onChangeHandler={changeHandler}
              onBlurHandler={validateCatagory}
              categories={categories}
            />
            {categoryError && <ClientError error={categoryError} />}
          </div>
          <FormButton
            formName={formName}
            isDisabled={isDisabled}
            onCancelFormHandler={onCancelFormHandler}
          />
        </form>
      </div>
    </section>
  );
}

export default FormArticle;
