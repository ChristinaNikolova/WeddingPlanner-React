function categorieViewModel(categorie) {
    return {
        id: categorie._id,
        name: categorie.name,
        image: categorie.image,
    }
}

module.exports = {
    categorieViewModel,
}