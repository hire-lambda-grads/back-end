exports.seed = function(knex, Promise) {
  return knex("roles").insert([
    { id: 1, role: "student" },
    { id: 2, role: "recruiter" },
    { id: 3, role: "staff" }
  ]);
};
