// Create bucketitempost table
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comment', function(tbl) {
        tbl.increments('id')
           .unsigned()
           .unique();
        tbl.integer('item_id')
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('bucketitem')
           .onDelete("CASCADE")
           .onUpdate("CASCADE");
        tbl.string('body', 1000);  
        tbl.timestamp('created')
        .defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comment');

};