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

module.exports = router;
