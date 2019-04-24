exports.seed = function(knex, Promise) {
  return knex("cohort_types").insert([
    { type: "Full-Stack Web Development & Computer Science" },
    { type: "iOS Development & Computer Science" },
    { type: "Data Science" },
    { type: "Android Development & Computer Science" },
    { type: "UX Design" }
  ]);
};
