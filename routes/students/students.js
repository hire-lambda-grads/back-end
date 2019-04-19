const db = require("../../data/config");

module.exports = {
  getStudent,
  getStudentById,
  getStudentCards,
  getStudentLocations,
  getStudentProfile,
  updateStudent
};

function getStudent(account_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let student = await db("students")
        .where({ account_id })
        .select(
          "id",
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
        let skills = await db("student_skills")
          .select("skills.skill")
          .innerJoin("skills", "skills.id", "student_skills.skill_id")
          .where({ "student_skills.student_id": student.id });
        skills = skills.map(skill => skill.skill);
        const skill_options = await db("skills").select(
          "id as skill_id",
          "skill"
        );
        student = {
          ...student,
          skills,
          skill_options, //List of student's current skills
          cohort_options //So update form can have all cohort_id's to tie to a student
        };
        resolve(student);
      } else {
        reject(Error("Could not locate student."));
      }
    } catch (error) {
      reject(Error("Something went wrong fetching all student information."));
    }
  });
}

function getStudentById(id) {
  return db("students")
    .select(
      "students.profile_pic",
      "students.location",
      "students.relocatable",
      "students.about",
      "students.job_searching",
      "students.careers_approved",
      "students.did_pm",
      "students.website",
      "students.github",
      "students.linkedin",
      "students.twitter",
      "accounts.first_name",
      "accounts.last_name",
      "cohorts.cohort_name",
      "cohort_types.type as track"
    )
    .innerJoin("accounts", "accounts.id", "students.account_id")
    .innerJoin("cohorts", "cohorts.id", "students.cohort_id")
    .innerJoin("cohort_types", "cohorts.cohort_type_id", "cohort_types.id")
    .where({ "students.id": id })
    .first();
}

function getStudentCards() {
  return db("students")
    .select(
      "students.id",
      "students.profile_pic",
      "students.location",
      "students.relocatable",
      "students.website",
      "students.github",
      "students.linkedin",
      "students.twitter",
      "students.careers_approved",
      "accounts.first_name",
      "accounts.last_name",
      "cohorts.cohort_name",
      "cohort_types.type as track"
    )
    .innerJoin("accounts", "accounts.id", "students.account_id")
    .leftOuterJoin("cohorts", "students.cohort_id", "cohorts.id")
    .leftOuterJoin("cohort_types", "cohorts.cohort_type_id", "cohort_types.id");
  // .where({ "students.job_searching": true });
}

function getStudentProfile(account_id) {
  return db("students")
    .select(
      "students.profile_pic",
      "students.location",
      "students.relocatable",
      "students.about",
      "students.job_searching",
      "students.careers_approved",
      "students.did_pm",
      "students.website",
      "students.github",
      "students.linkedin",
      "students.twitter",
      "accounts.first_name",
      "accounts.last_name",
      "cohorts.cohort_name",
      "cohort_types.type as track"
    )
    .innerJoin("accounts", "accounts.id", "students.account_id")
    .leftOuterJoin("cohorts", "cohorts.id", "students.cohort_id")
    .leftOuterJoin("cohort_types", "cohorts.cohort_type_id", "cohort_types.id")
    .where({ "students.account_id": account_id })
    .first();
}

function getStudentLocations() {
  return db("students")
    .select("location", "job_searching")
    .whereNotNull("location");
}

function updateStudent(account_id, info, skills) {
  return new Promise(async (resolve, reject) => {
    let student, newSkills;
    try {
      [student] = await db("students")
        .where({ account_id })
        .update(info, [
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
        ]);
      await db("student_skills")
        .where({ student_id: info.id })
        .del();
      if (skills.length > 0) {
        //Need to restructure skills with student ID for student_skills table. Handling here so FE doesn't have to.
        skills = skills.map(id => ({ skill_id: id, student_id: info.id }));
        await db("student_skills").insert(skills);

        newSkills = await db("student_skills")
          .select("skills.skill")
          .innerJoin("skills", "skills.id", "student_skills.skill_id")
          .where({ "student_skills.student_id": info.id });

        newSkills = newSkills.map(skill => skill.skill);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
    resolve({
      ...student,
      skills: newSkills
    });
  });
}
