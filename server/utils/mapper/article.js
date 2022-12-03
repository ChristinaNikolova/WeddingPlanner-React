const { categoryNameViewModel } = require("./category");

function articleViewModel(article) {
    return {
        id: article._id,
        title: article.title,
        content: article.content,
        image: article.image,
        category: categoryNameViewModel(article.category),
    };
}

module.exports = {
    articleViewModel,
}