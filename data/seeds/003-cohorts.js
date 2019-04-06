exports.seed = function(knex, Promise) {
  return knex("cohorts").insert([
    {
      id: 1,
      cohort_type_id: 1,
      cohort_name: "Web16"
    },
    {
      id: 2,
      cohort_type_id: 1,
      cohort_name: "Web17"
    },
    {
      id: 3,
      cohort_type_id: 1,
      cohort_name: "Web18"
    }
  ]);
};
