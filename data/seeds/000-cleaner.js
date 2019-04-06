const cleaner = require("knex-cleaner");

const options = {
  ignoreTables: ["accounts", "students", "hired"]
};

exports.seed = function(knex) {
  return cleaner.clean(knex, options);
};
