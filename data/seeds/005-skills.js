exports.seed = function(knex, Promise) {
  return knex("skills").insert([
    { skill: "HTML" },
    { skill: "CSS" },
    { skill: "SASS" },
    { skill: "Less" },
    { skill: "JavaScript" },
    { skill: "React" },
    { skill: "Redux" },
    { skill: "Vue JS" },
    { skill: "Node.js" },
    { skill: "Express" },
    { skill: "MongoDB" },
    { skill: "Firebase" },
    { skill: "SQL" },
    { skill: "Python" }
  ]);
};
