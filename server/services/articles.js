const Article = require("../models/Article");
const { articleViewModel } = require("../utils/mapper/article");

async function create(title, content, image, category) {
    let article = await getArticleByTitle(title);

    if (article) {
        throw new Error('Title is already taken');
    }

    article = new Article({
        title,
        content,
        image,
        category,
    });

    await article.save();

    return article;
}

async function all() {
    return (await Article
        .find({})
        .populate('category', 'name')
        .sort({ createdAt: -1 }))
        .map(articleViewModel);
}

async function getArticleByTitle(title) {
    return await Article
        .findOne({ title })
        .collation({ locale: 'en', strength: 2 });
}

module.exports = {
    create,
    all,
}