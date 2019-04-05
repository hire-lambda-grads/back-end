exports.up = function(knex, Promise) {};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("staff")
    .dropTableIfExists("recruiters")
    .dropTableIfExists("students")
    .dropTableIfExists("roles")
    .dropTableIfExists("cohorts")
    .dropTableIfExists("cohort_types");
};
