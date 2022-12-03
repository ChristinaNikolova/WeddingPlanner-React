function articleViewModel(article) {
    console.log(article)
    return {
        id: article._id,
        title: article.title,
        content: article.content,
        image: article.image,
        category: test(article.category),
    };
}

function test(category) {
    return {
        id: category._id,
        name: category.name,
    }
}

module.exports = {
    articleViewModel,
}