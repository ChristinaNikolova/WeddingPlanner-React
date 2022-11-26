const Category = require("../../models/Category");

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

async function getCategoryByName(name) {
    return await Category.findOne({ name }).collation({ locale: 'en', strength: 2 });
}

module.exports = {
    create,
}