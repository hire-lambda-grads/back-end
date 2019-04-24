exports.seed = function(knex, Promise) {
  return knex("cohorts").insert([
    {
      cohort_type_id: 1,
      cohort_name: "Web16"
    },
    {
      cohort_type_id: 1,
      cohort_name: "Web17"
    },
    {
      cohort_type_id: 1,
      cohort_name: "Web18"
    }
  ]);
};
