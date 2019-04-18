exports.seed = function(knex, Promise) {
  return knex("roles").insert([
    { role: "student" },
    { role: "recruiter" },
    { role: "staff" }
  ]);
};
