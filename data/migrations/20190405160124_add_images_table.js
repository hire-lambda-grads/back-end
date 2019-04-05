
exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', tbl => {
    tbl.increments();
    tbl
      .string('url')
      .notNullable()
      .unique();
    tbl
      .integer("account_id")
      .unsigned()
      .references("accounts.id")
      // .notNullable()
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('images');
};
