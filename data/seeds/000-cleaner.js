exports.seed = function(knex, Promise) {
  return knex.schema.raw(
    "TRUNCATE roles, accounts, cohort_types, cohorts, skills, skill_types, students, student_skills, hired RESTART IDENTITY;"
  );
};
