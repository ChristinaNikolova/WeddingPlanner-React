const Article = require("../models/Article");
const { articleViewModel } = require("../utils/mapper/article");
const { Types: { ObjectId } } = require('mongoose');

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

async function all(take, skip, selectedCategory, searchedQuery) {
    return (await Article
        .find(selectedCategory ? { category: new ObjectId(selectedCategory) } : {})
        .find(searchedQuery ? { title: { "$regex": searchedQuery, "$options": "i" } } : {})
        .populate('category', 'name')
        .sort({ createdAt: -1, title: 1 })
        .skip(skip)
        .limit(take))
        .map(articleViewModel);
}

async function getTotalCount(selectedCategory, searchedQuery) {
    return (await Article
        .find(selectedCategory ? { category: new ObjectId(selectedCategory) } : {})
        .find(searchedQuery ? { title: { "$regex": searchedQuery, "$options": "i" } } : {}))
        .length;
}

async function getArticleByTitle(title) {
    return await Article
        .findOne({ title })
        .collation({ locale: 'en', strength: 2 });
}

module.exports = {
    create,
    all,
    getTotalCount,
}