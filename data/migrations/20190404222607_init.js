exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("roles", tbl => {
      tbl.increments();
      tbl
        .string("role")
        .notNullable()
        .unique();
    })

    .createTable("accounts", tbl => {
      tbl.increments();
      tbl
        .integer("role_id")
        .unsigned()
        .references("roles.id")
        .notNullable()
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .string("email")
        .notNullable()
        .unique();
      tbl.string("password").notNullable();
      tbl.string("first_name").notNullable();
      tbl.string("last_name").notNullable();
      tbl
        .boolean("verified_student")
        .notNullable()
        .defaultTo(false);
    })

    .createTable("cohort_types", tbl => {
      tbl.increments();
      tbl
        .string("type")
        .notNullable()
        .unique();
    })

    .createTable("cohorts", tbl => {
      tbl.increments();
      tbl
        .integer("cohort_type_id")
        .unsigned()
        .references("cohort_types.id")
        .notNullable()
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .string("cohort_name")
        .notNullable()
        .unique();
      tbl.date("start_date");
      tbl.date("end_date");
    })

    .createTable("students", tbl => {
      tbl.increments();
      tbl
        .integer("account_id")
        .unsigned()
        .notNullable()
        .references("accounts.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("cohort_id")
        .unsigned()
        .references("cohorts.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.string("profile_pic").unique();
      tbl.string("location", 50);
      tbl.boolean("relocatable");
      tbl.text("about", 840);
      tbl.boolean("job_searching").defaultTo(false);
      tbl.boolean("careers_approved").defaultTo(false);
      tbl.boolean("did_pm").defaultTo(false);
      tbl.string("website").unique();
      tbl.string("github").unique();
      tbl.string("linkedin").unique();
      tbl.string("twitter").unique();
    })

    .createTable("hired", tbl => {
      tbl.increments();
      tbl
        .integer("student_id")
        .unsigned()
        .notNullable()
        .references("students.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.date("hire_date").notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("accounts")
    .dropTableIfExists("hired")
    .dropTableIfExists("students")
    .dropTableIfExists("roles")
    .dropTableIfExists("cohorts")
    .dropTableIfExists("cohort_types");
};
