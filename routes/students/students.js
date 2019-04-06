const db = require("../../data/config");

module.exports = {
  getStudentCards
};

function getStudentCards() {
  return db("accounts");
}
