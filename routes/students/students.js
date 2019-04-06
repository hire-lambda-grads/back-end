const db = require("../../data/config");

module.exports = {
  getStudent,
  getStudentCards,
  updateStudent
};

function getStudent(account_id) {
  return db("students")
    .where({ account_id })
    .first();
}

function getStudentCards() {
  return db("accounts");
}

function updateStudent(account_id, info) {
  return db("students")
    .where({ account_id })
    .update(info);
}
