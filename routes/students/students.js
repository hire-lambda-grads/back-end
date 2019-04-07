const db = require("../../data/config");

module.exports = {
  getStudent,
  getStudentCards,
  updateStudent
};

function getStudent(account_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let student = await db("students")
        .where({ account_id })
        .select(
          "cohort_id",
          "profile_pic",
          "location",
          "relocatable",
          "about",
          "job_searching",
          "website",
          "github",
          "linkedin",
          "twitter"
        )
        .first();
      if (student) {
        const cohort_options = await db("cohorts").select(
          "id as cohort_id",
          "cohort_name"
        );
        student = {
          ...student,
          cohort_options //So update form can have all cohort_id's to tie to a student
        };
        resolve(student);
      } else {
        reject();
      }
    } catch (error) {
      reject();
    }
  });
}

function getStudentCards() {
  return db("accounts");
}

async function updateStudent(account_id, info) {
  return new Promise(async (resolve, reject) => {
    try {
      await db("students")
        .where({ account_id })
        .update(info);

      resolve(
        db("students")
          .where({ account_id })
          .first()
      );
    } catch (error) {
      reject();
    }
  });
}
