import { useState, useEffect } from "react";

import * as articlesService from "../../../../services/articles";

import LastSingleArticle from "../LastSingleArticle/LastSingleArticle";

import styles from "./LastThreeArticles.module.css";

function LastThreeArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    articlesService
      .getLastThree()
      .then((res) => setArticles(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles["last-three-articles-section-wrapper"]}>
      <h3 className={styles["last-three-artilces-title"]}>Recent articles</h3>
      <div className={styles["last-three-articles-wrapper"]}>
        {articles.map((a) => (
          <LastSingleArticle
            key={a.id}
            id={a.id}
            title={a.title}
            shortContent={a.shortContent}
            image={a.image}
          />
        ))}
      </div>
    </div>
  );
}

export default LastThreeArticles;
