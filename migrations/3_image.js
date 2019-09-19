// Create imagePost table
exports.up = function(knex, Promise) {
    return knex.schema.createTable('image', function(tbl) {
        tbl.increments('id')
           .unsigned()
           .unique();
        tbl.integer('post_id')
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('post')
           .onDelete("CASCADE")
           .onUpdate("CASCADE");
        tbl.string('url');
        tbl.timestamp('created')
        .defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('image');
};