const db = require("../../data/config");

module.exports = {
  getStudentCards,
  updateStudent
};

function updateStudent(account_id, info) {
  return db("students")
    .where({ account_id })
    .update(info);
}

function getStudentCards() {
  return db("accounts");
}
