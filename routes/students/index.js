const router = require("express").Router();

const actions = require("./students");
const cloudParser = require("../../config/cloudinary");
const restricted = require("../../middleware/restricted");

module.exports = router;

router.route("/cards").get(async (req, res) => {
  try {
    const students = await actions.getStudentCards();
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong retrieving the student cards." });
  }
});

router.route("/profile/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const student = await actions.getStudentById(id);
    if (student) {
      res.status(200).json(student);
    } else {
      res
        .status(404)
        .json({ message: "No student could be located with that ID." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong retrieving the student." });
  }
});

router.route("/locations").get(async (req, res) => {
  try {
    const locations = await actions.getStudentLocations();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({
      message: "Soemthing went wrong retrieving the student locations."
    });
  }
});

router
  .route("/update")
  .get(restricted(), async (req, res) => {
    const account_id = req.token.subject;

    try {
      const student = await actions.getStudent(account_id);
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong retrieving student information."
      });
    }
  })
  .put(restricted(), cloudParser.single("image"), async (req, res) => {
    const info = JSON.parse(req.body.studentInfo);
    console.log("INITIAL INFO", info);
    let { account_id, image, careers_approved, did_pm, ...filteredInfo } = info;
    account_id = req.token.subject;
    console.log("DESTRUCTURED INFO", filteredInfo);
    if (req.file) {
      filteredInfo = {
        ...filteredInfo,
        profile_pic: req.file.url
      };
    }
    console.log("FILTERED INFO AFTER MERGE", filteredInfo);
    try {
      const updated = await actions.updateStudent(account_id, filteredInfo);
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong updating the user information."
      });
    }
  });

//Cloudinary example
// server.post('/api/images', cloudParser.single("image"), (req, res) => {
//     console.log(req.file) // to see what is returned to you
//     const image = {};
//     image.url = req.file.url;
//     image.id = req.file.public_id;
//     db('images').insert(image) // save image information in database
//       .then(newImage => res.json(newImage))
//       .catch(err => console.log(err));
//   });
