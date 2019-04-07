const router = require("express").Router();

const accountsActions = require("./accounts");

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

router.route("/accounts/:id").put(async (req, res) => {
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
});

module.exports = router;
