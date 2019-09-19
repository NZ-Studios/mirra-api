// Create post table
exports.up = function(knex, Promise) {
    return knex.schema.createTable('post', function(tbl) {
        tbl.increments('id')
           .unsigned()
           .unique();
        tbl.integer('user_id')
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('users')
           .onDelete("CASCADE")
           .onUpdate("CASCADE");
        tbl.string('body', 1000)
           .notNullable()
           tbl.timestamp('created')
           .defaultTo(knex.fn.now());
      });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('post')

};