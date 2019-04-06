exports.seed = function(knex, Promise) {
  return knex("cohort_types").insert([
    { id: 1, type: "Full-Stack Web Development & Computer Science" },
    { id: 2, type: "iOS Development & Computer Science" },
    { id: 3, type: "Data Science" },
    { id: 4, type: "Android Development & Computer Science" },
    { id: 5, type: "UX Design" }
  ]);
};
