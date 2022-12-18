const Article = require("../models/Article");
const { Types: { ObjectId } } = require('mongoose');

async function getFavArticles(userId) {
    return (await Article.find({})).filter((a) => a.likes.includes(ObjectId(userId)));
}

module.exports = {
    getFavArticles,
}