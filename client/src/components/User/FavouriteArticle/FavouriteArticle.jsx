import { useEffect, useState } from "react";

import * as usersService from "../../../services/users";

import ArticlesList from "../../Blog/AllriclesList/ArticlesList";
import Jumbotron from "../../shared/Jumbotron/Jumbotron";

import styles from "./FavouriteArticle.module.css";

function FavouriteArticle({ pathToImage }) {
  const [favArticles, setFavArticles] = useState([]);

  useEffect(() => {
    usersService
      .getFav()
      .then((res) => setFavArticles(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles["fav-articles"]}>
      <Jumbotron pathToImage={pathToImage} isHomePage={false} />
      <h4 className={styles["fav-articles-title"]}>Favourite Articles</h4>
      <ArticlesList articles={favArticles} />
    </section>
  );
}

export default FavouriteArticle;
