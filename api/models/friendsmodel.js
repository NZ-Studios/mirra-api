const db = require('../../data/dbConfig');

module.exports = {
    getFriends,
    createFriend,
    deleteFriend
}

function getFriends(id) {
    return db
        .select('friend_id', 'name', 'email')
        .from('friends')
        .join('users', 'users.id', 'friends.friend_id')
        .where({ user_id: id })
}

async function createFriend(user_id, friend_id) {
    const result = await db('friends')
        .where({ user_id: user_id, friend_id: friend_id })
        .first();

    if (result)
        return { exists: result };

    const user = await db('users')
        .where({ id: user_id })
        .first();

    const friend = await db('friends')
        .where({ id: friend_id })
        .first();
    if (!user)
        return { bad_user: 'User ID Is Invalid' }
    if (!friend)
        return { bad_friend: 'Friend ID is Invalid' }
    const userid = await db('friends')
        .insert({ user_id: user_id, friend_id: friend_id })

    return userid;
}

function deleteFriend(user_id, friend_id) {
    return db('friends')
    .where({user_id: user_id, friend_id:friend_id})
    .del();
}