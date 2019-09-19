const db = require('../../data/dbConfig');

module.exports = {
    getCommentById,
    getCommenttByItemId,
    createComment,
    updateComment,
    deleteComment
}

function getCommentById(id) {
    return db('comment')
        .where({ id })
        .first()
}

function getCommenttByItemId(item_id){
    return ('comment')
        .where({item_id})
}
async function createComment(comment){
    const [id] = await db('comment')
    .insert(comment)

    return id;
}
function updateComment(id, comment){
    return db('comment')
    .where({id})
    .update(comment)
}

function deleteComment(id){
    return db('comment')
    .where({id})
    .del();
}