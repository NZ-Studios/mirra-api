exports.up = function(knex, Promise) {
    return knex.schema.createTable('friends', function(tbl) {
           tbl.integer('user_id')
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('users')
           .onDelete("CASCADE")
           .onUpdate("CASCADE");
           tbl.integer('friend_id')
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('users')
           .onDelete("CASCADE")
           .onUpdate("CASCADE");
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('friends');
};