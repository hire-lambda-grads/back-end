const db = require("../../data/config");

module.exports = {
  addCohort,
  deleteCohort,
  getCohorts,
  updateCohort
};

function addCohort(info) {
  return new Promise(async (resolve, reject) => {
    try {
      await db("cohorts").insert(info);
      resolve(db("cohorts").where({ cohort_name: info.cohort_name }));
    } catch (error) {
      reject();
    }
  });
}

function deleteCohort(id) {
  return db("cohorts")
    .where({ id })
    .del();
}

function getCohorts() {
  return new Promise(async (resolve, reject) => {
    try {
      let cohorts = await db("cohorts");
      if (cohorts) {
        const type_options = await db("cohort_types").select(
          "id as cohort_type_id",
          "type"
        );
        const mergedFields = cohorts.map(cohort => ({
          ...cohort,
          type_options
        }));
        resolve(mergedFields);
      } else {
        reject();
      }
    } catch (error) {
      reject();
    }
  });
}

function updateCohort(id, info) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db("cohorts")
        .where({ id })
        .update(info, "*");
      resolve(res);
    } catch (error) {
      reject();
    }
  });
}
