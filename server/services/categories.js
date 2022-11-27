const Category = require("../models/Category");
const { categorieViewModel } = require("../utils/mapper/category");

async function create(name, image) {
    let category = await getCategoryByName(name);

    if (category) {
        throw new Error('Category name is already taken');
    }

    category = new Category({
        name,
        image,
    });

    await category.save();

    return category;
}

async function all() {
    return (await Category.find({})).map(categorieViewModel);
}

async function getCategoryByName(name) {
    return await Category.findOne({ name }).collation({ locale: 'en', strength: 2 });
}

module.exports = {
    create,
    all,
}