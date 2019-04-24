const db = require("../../data/config");

module.exports = {
  getStudentForUpdate,
  getStudentById,
  getStudentCards,
  getStudentLocations,
  getStudentProfile,
  updateStudent
};

function getStudentForUpdate(account_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        rows: [student]
      } = await db.raw(
        `select s.id, s.cohort_id, s.profile_pic, s.location, s.relocatable, s.about, s.job_searching, s.website, s.github, s.linkedin, s.twitter, array_agg(sk.skill) as skills from students as s left outer join student_skills as ss on ss.student_id = s.id left outer join skills as sk on sk.id = ss.skill_id where s.account_id = ${account_id} group by s.id, s.cohort_id, s.profile_pic, s.location, s.relocatable, s.about, s.job_searching, s.website, s.github, s.linkedin, s.twitter`
      );
      if (student) {
        const cohort_options = await db("cohorts").select(
          "id as cohort_id",
          "cohort_name"
        );
        const skill_options = await db("skills").select(
          "id as skill_id",
          "skill"
        );
        student = {
          ...student,
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
  return db.raw(
    `select s.*, a.first_name, a.last_name, c.cohort_name, ct.type as track, array_agg(sk.skill) as skills from students as s join accounts as a on a.id = s.account_id left outer join cohorts as c on s.cohort_id = c.id left outer join cohort_types as ct on ct.id = c.cohort_type_id left outer join student_skills as ss on ss.student_id = s.id left outer join skills as sk on sk.id = ss.skill_id where s.id = ${id} group by s.id, a.first_name, a.last_name, c.cohort_name, ct.type`
  );
}

function getStudentCards() {
  return db.raw(
    "select s.*, a.first_name, a.last_name, c.cohort_name, ct.type as track, array_agg(sk.skill) as skills from students as s join accounts as a on a.id = s.account_id left outer join cohorts as c on s.cohort_id = c.id left outer join cohort_types as ct on ct.id = c.cohort_type_id left outer join student_skills as ss on ss.student_id = s.id left outer join skills as sk on sk.id = ss.skill_id group by s.id, a.first_name, a.last_name, c.cohort_name, ct.type"
  );
}

function getStudentProfile(account_id) {
  return db.raw(
    `select s.*, a.first_name, a.last_name, c.cohort_name, ct.type as track, array_agg(sk.skill) as skills from students as s join accounts as a on a.id = s.account_id left outer join cohorts as c on s.cohort_id = c.id left outer join cohort_types as ct on ct.id = c.cohort_type_id left outer join student_skills as ss on ss.student_id = s.id left outer join skills as sk on sk.id = ss.skill_id where s.account_id = ${account_id} group by s.id, a.first_name, a.last_name, c.cohort_name, ct.type`
  );
}

function getStudentLocations() {
  return db.raw(
    "select a.first_name, a.last_name, s.location, s.profile_pic from students as s join accounts as a on a.id = s.account_id where s.location is not null"
  );
}

function updateStudent(account_id, info, skills) {
  return new Promise(async (resolve, reject) => {
    let student, newSkills;
    await db.transaction(async t => {
      try {
        [student] = await db("students")
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
          ])
          .where({ account_id })
          .transacting(t);

        await db("student_skills")
          .where({ student_id: info.id })
          .del()
          .transacting(t);

        if (skills) {
          skills = skills.map(id => ({ skill_id: id, student_id: info.id }));
          await db("student_skills")
            .insert(skills)
            .transacting(t);

          newSkills = await db("student_skills")
            .select("skills.skill")
            .innerJoin("skills", "skills.id", "student_skills.skill_id")
            .where({ "student_skills.student_id": info.id })
            .transacting(t);
        }
      } catch (error) {
        t.rollback();
        reject(error);
      }
    });
    resolve({
      ...student,
      skills: newSkills.map(s => s.skill) || []
    });
  });
}
