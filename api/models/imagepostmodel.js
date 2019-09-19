const db = require('../../data/dbConfig');

module.exports = {
    getImagePostById,
    getImagePostByItemId,
    createImagePost,
    updateImagePost,
    deleteImagePost
}

function getImagePostById(id) {
    return db('image')
        .where({ id })
        .first()
}

function getImagePostByItemId(item_id){
    return ('image')
        .where({item_id})
}
async function createImagePost(image){
    const [id] = await db('image')
    .insert(image)

    return id;
}
function updateImagePost(id, image){
    return db('image')
    .where({id})
    .update(image)
}

function deleteImagePost(id){
    return db('image')
    .where({id})
    .del();
}