const db = require('../../data/dbConfig');

module.exports = {
    getPostById,
    getPostByUserId,
    createpost,
    updatePost,
    deletePost
}

function getPostById(id) {
    return db('post')
        .where({ id })
        .first()
}

function getPostByUserId(item_id){
    return ('post')
        .where({item_id})
}
async function createpost(post){
    const [id] = await db('post')
    .insert(post)

    return id;
}
function updatePost(id, post){
    return db('post')
    .where({id})
    .update(post)
}

function deletePost(id){
    return db('post')
    .where({id})
    .del();
}