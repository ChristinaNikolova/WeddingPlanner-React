function noteViewModel(note) {
    return {
        id: note._id,
        description: note.description,
        createdAt: note.createdAt,
    }
}

module.exports = {
    noteViewModel,
}