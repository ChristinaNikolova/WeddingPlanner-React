const { categoryViewModel, categoryNameViewModel } = require("./category");

function articleListViewModel(article) {
    return {
        id: article._id,
        title: article.title,
        shortContent: article.content.slice(0, 200) + '...',
        image: article.image,
        category: categoryNameViewModel(article.category),
        createdAt: createdAtViewModel(article.createdAt),
    };
}

function articleDetailsViewModel(article) {
    return {
        id: article._id,
        title: article.title,
        content: article.content,
        image: article.image,
        jumboImage: article.jumboImage,
        likes: article.likes.length,
        category: categoryViewModel(article.category),
        createdAt: createdAtViewModel(article.createdAt),
        //todo comments should be separate
    };
}

function createdAtViewModel(createdAt) {
    return createdAt.getDate()
        + '/'
        + createdAt.getMonth()
        + '/'
        + createdAt.getFullYear().toString().substr(-2);
}

module.exports = {
    articleListViewModel,
    articleDetailsViewModel,
}