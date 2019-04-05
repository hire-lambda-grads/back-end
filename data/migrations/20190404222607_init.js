exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("roles", tbl => {
      //PK
      tbl.increments();

      //Role
      tbl
        .string("role")
        .notNullable()
        .unique();
    })

    .createTable("accounts", tbl => {
      //PK
      tbl.increments();

      //Role FK
      tbl
        .integer("role_id")
        .unsigned()
        .references("roles.id")
        .notNullable()
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      //Username
      tbl
        .string("username", 20)
        .notNullable()
        .unique();

      //Password
      tbl.string("password").notNullable();

      //First Name
      tbl.string("first_name").notNullable();

      //Last Name
      tbl.string("last_name").notNullable();

      //Email
      tbl
        .string("email")
        .notNullable()
        .unique();

      //Verified Student
      tbl
        .boolean("verified_student")
        .notNullable()
        .defaultTo(false);
    })

    .createTable("cohort_types", tbl => {
      //PK
      tbl.increments();

      //Cohort type
      tbl
        .string("type")
        .notNullable()
        .unique();
    })

    .createTable("cohorts", tbl => {
      //PK
      tbl.increments();

      //Cohort Type FK
      tbl
        .integer("cohort_type_id")
        .unsigned()
        .references("cohort_types.id")
        .notNullable()
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      //Cohort Name
      tbl
        .string("cohort_name")
        .notNullable()
        .unique();

      //Start Date
      tbl.date("start_date");

      //End Date
      tbl.date("end_date");
    })

    .createTable("students", tbl => {
      //PK
      tbl.increments();

      //Account ID FK
      tbl
        .integer("account_id")
        .unsigned()
        .notNullable()
        .references("accounts.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      //Cohort ID FK
      tbl
        .integer("cohort_id")
        .unsigned()
        .notNullable()
        .references("cohorts.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      //Profile Pic
      tbl.string("profile_pic").unique();

      //Location
      tbl.string("location", 50);

      //Relocatable
      tbl.boolean("relocatable");

      //About
      tbl.text("about", 840);

      //Job Searching
      tbl.boolean("job_searching");

      //Careers Approved
      tbl.boolean("careers_approved");

      //Did PM?
      tbl.boolean("did_pm");

      //Website
      tbl.string("website").unique();

      //Github
      tbl.string("github").unique();

      //LinkedIn
      tbl.string("linkedin").unique();

      //Twitter
      tbl.string("twitter").unique();
    })

    .createTable("hired", tbl => {
      //PK
      tbl.increments();

      //Student ID FK ----------Maybe make unique to prevent duplicate students?? But what if they get hired twice?
      tbl
        .integer("student_id")
        .unsigned()
        .notNullable()
        .references("students.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      //Hire Date
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
