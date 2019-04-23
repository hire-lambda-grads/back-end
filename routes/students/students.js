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
  return new Promise(async (resolve, reject) => {
    let student,
      skills,
      hobbies,
      endorsements,
      top_skills,
      desired_locations,
      top_projects,
      projects;
    await db.transaction(async t => {
      try {
        student = await db("students as s")
          .select(
            "a.first_name",
            "a.last_name",
            "s.*",
            "c.cohort_name",
            "t.name as track"
          )
          .leftOuterJoin("accounts as a", "a.id", "s.account_id")
          .leftOuterJoin("cohorts as c", "c.id", "s.cohort_id")
          .leftOuterJoin("tracks as t", "t.id", "s.track_id")
          .where({ "s.account_id": account_id })
          .first()
          .transacting(t);

        skills = await db("student_skills as s")
          .select("s.skill")
          .where({ student_id: student.id })
          .transacting(t);

        hobbies = await db("hobbies as h")
          .select("h.hobby")
          .where({ student_id: student.id })
          .transacting(t);

        endorsements = await db("endorsements as e")
          .select("e.message", "a.first_name", "a.last_name")
          .join("accounts as a", "a.id", "e.from_id")
          .where({ "e.to_id": student.id })
          .transacting(t);

        top_skills = await db("top_skills as ts")
          .select("ts.skill")
          .where({ student_id: student.id })
          .transacting(t);

        desired_locations = await db("desired_locations as dl")
          .select("dl.location")
          .where({ student_id: student.id })
          .transacting(t);

        top_projects = await db("top_projects as t")
          .select(
            "p.id",
            "p.name",
            "p.github",
            "pm.media",
            db.raw("array_agg(ps.skill) as skills")
          )
          .join("projects as p", "p.id", "t.project_id")
          .leftOuterJoin("project_media as pm", "pm.project_id", "p.id")
          .leftOuterJoin("project_skills as ps", "ps.project_id", "p.id")
          .where({ "t.student_id": student.id, approved: true })
          .groupBy("p.name", "p.github", "pm.media", "p.id")
          .transacting(t);

        projects = await db("student_projects as sp")
          .select(
            "p.id",
            "p.name",
            "p.github",
            "pm.media",
            db.raw("array_agg(ps.skill) as skills")
          )
          .join("projects as p", "p.id", "sp.project_id")
          .leftOuterJoin("project_media as pm", "pm.project_id", "p.id")
          .leftOuterJoin("project_skills as ps", "ps.project_id", "p.id")
          .where({ "sp.student_id": student.id, approved: true })
          .groupBy("p.name", "p.github", "pm.media", "p.id")
          .transacting(t);
      } catch (error) {
        t.rollback();
        reject(error);
      }
    });
    resolve({
      ...student,
      top_skills,
      skills,
      hobbies,
      endorsements,
      desired_locations,
      top_projects,
      projects
    });
  });
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
