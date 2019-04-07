const router = require("express").Router();

const accountsActions = require("./accounts");
const studentsActions = require("./students");
const cohortsActions = require("./cohorts");

const resources = {
  accounts: [
    accountsActions.getAccounts,
    accountsActions.updateAccount,
    accountsActions.deleteAccount
  ],
  students: [
    studentsActions.getStudents,
    studentsActions.updateStudent,
    studentsActions.deleteStudent
  ],
  cohorts: [
    cohortsActions.getCohorts,
    cohortsActions.updateCohort,
    cohortsActions.deleteCohort
  ]
};

router.route("/:resource").get(async (req, res) => {
  try {
    const resource = await resources[req.params.resource][0]();
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({
      message: `There was an error retrieving the ${req.params.resource}.`
    });
  }
});

router
  .route("/:resource/:id")
  .put(async (req, res) => {
    const { id } = req.params;
    const info = req.body;

    try {
      const resource = await resources[req.params.resource][1](id, info);
      res.status(200).json(resource);
    } catch (error) {
      res.status(500).json({
        message: `There was an error updating the ${req.params.resource}.`
      });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    try {
      await resources[req.params.resource][2](id);
      res.status(200).end();
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong deleting the ${req.params.resource}.`
      });
    }
  });

module.exports = router;
