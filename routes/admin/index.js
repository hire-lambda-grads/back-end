const router = require("express").Router();

const accountsActions = require("./accounts");
const studentsActions = require("./students");

router.route("/accounts").get(async (req, res) => {
  try {
    const accounts = await accountsActions.getAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error retrieving the accounts." });
  }
});

router
  .route("/accounts/:id")
  .put(async (req, res) => {
    const { id } = req.params;
    const info = req.body;

    try {
      const updated = await accountsActions.updateAccount(id, info);
      res.status(200).json(updated);
    } catch (error) {
      res
        .status(500)
        .json({ message: "There was an error updating the account." });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    try {
      await accountsActions.deleteAccount(id);
      res.status(200).end();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong deleting the account." });
    }
  });

router.route("/students").get(async (req, res) => {
  try {
    const students = await studentsActions.getStudents();
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error retrieving the students." });
  }
});

router
  .route("/students/:id")
  .put(async (req, res) => {
    const { id } = req.params;
    const info = req.body;

    try {
      const updated = await studentsActions.updateStudent(id, info);
      res.status(200).json(updated);
    } catch (error) {
      res
        .status(500)
        .json({ message: "There was an error updating the student." });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    try {
      await studentsActions.deleteStudent(id);
      res.status(200).end();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong deleting the account." });
    }
  });

module.exports = router;
