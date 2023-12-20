import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import * as articlesService from "../../../../services/articles";
import { formNames } from "../../../../utils/constants/global";

import FormArticle from "../Form/FormArticle";

function UpdateArticle() {
  const formName = formNames.UPDATE;
  const navigate = useNavigate();
  const { id } = useParams();

  const [article, setArticle] = useState({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    articlesService
      .getById(id)
      .then((data) => setArticle(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const submitHandler = (title, content, image, jumboImage, category) => {
    articlesService
      .update(id, title, content, image, jumboImage, category)
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
    navigate(`/blog/${id}`);
  };

  if (
    !article.title ||
    !article.content ||
    !article.image ||
    !article.jumboImage ||
    !article.category
  ) {
    return null;
  }

  return (
    <FormArticle
      formName={formName}
      title={article.title}
      content={article.content.join(" ")}
      image={article.image}
      jumboImage={article.jumboImage}
      category={article.category}
      serverError={serverError}
      onSubmitHandler={submitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
}

export default UpdateArticle;
