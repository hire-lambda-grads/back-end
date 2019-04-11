const router = require("express").Router();

const actions = require("./register");

router.route("/").post(async (req, res) => {
  const user = req.body;
  if (
    user &&
    user.email &&
    user.password &&
    user.first_name &&
    user.last_name &&
    user.role_id
  ) {
    try {
      const count = await actions.addUser(user);
      if (count) {
        res.status(201).json({ message: "User successfully added." });
      } else {
        res.status(400).json({ message: "The user already exists." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong adding the new user." });
    }
  } else {
    res.status(400).json({
      message:
        "Please provide a  email, password, first name and last name for registration."
    });
  }
});

module.exports = router;
