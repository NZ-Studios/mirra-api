const db = require('../../data/dbConfig');

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    getUserByEmail
}

async function registerUser(user) {
    const [newUser] = await db('users').insert(user, ["id"]);
    return newUser.id;
}

function loginUser(email) {
    return db("users")
        .where({ email })
        .first();
}

function getUsers() {
    return db("users")
        .select("id", "name", "email", "created");
}

function getUserById(id) {
    return db("users")
        .select("id", "name", "email", "created")
        .where({ id })
        .first();
}
function getUserByEmail(id) {
    return db("users")
        .select("id", "name", "email", "created")
        .where({ email })
        .first();
}