exports.seed = function(knex, Promise) {
  return knex("skill_types").insert([
    { skill_id: 1, cohort_type_id: 1 },
    { skill_id: 2, cohort_type_id: 1 },
    { skill_id: 3, cohort_type_id: 1 },
    { skill_id: 4, cohort_type_id: 1 },
    { skill_id: 5, cohort_type_id: 1 },
    { skill_id: 6, cohort_type_id: 1 },
    { skill_id: 7, cohort_type_id: 1 },
    { skill_id: 8, cohort_type_id: 1 },
    { skill_id: 9, cohort_type_id: 1 },
    { skill_id: 10, cohort_type_id: 1 },
    { skill_id: 11, cohort_type_id: 1 },
    { skill_id: 12, cohort_type_id: 1 },
    { skill_id: 13, cohort_type_id: 1 },
    { skill_id: 14, cohort_type_id: 1 },
    { skill_id: 14, cohort_type_id: 3 }
  ]);
};
