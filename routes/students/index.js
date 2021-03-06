const router = require("express").Router();

const actions = require("./students");
const cloudParser = require("../../config/cloudinary");
const restricted = require("../../middleware/restricted");

module.exports = router;

router.route("/cards").get(async (req, res) => {
  try {
    students = await actions.getStudentCards();
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong retrieving the student cards." });
  }
});

router.route("/profile").get(restricted(), async (req, res) => {
  const account_id = req.token.subject;
  const { update } = req.query;
  try {
    const profile = await actions.getStudentProfile(account_id, update);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile." });
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

// router.route("/locations").get(async (req, res) => {
//   try {
//     const { rows: locations } = await actions.getStudentLocations();
//     res.status(200).json(locations);
//   } catch (error) {
//     res.status(500).json({
//       message: "Soemthing went wrong retrieving the student locations."
//     });
//   }
// });

router.route("/update").put(restricted(), async (req, res) => {
  let {
    account_id,
    careers_approved,
    did_pm,
    skills,
    ...filteredInfo
  } = req.body;
  account_id = req.token.subject;

  try {
    const updated = await actions.updateStudent(
      account_id,
      filteredInfo,
      skills
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong updating the user information.",
      error
    });
  }
});

router
  .route("/update/profile_picture")
  .put(restricted(), cloudParser.single("image"), async (req, res) => {
    const account_id = req.token.subject;
    try {
      if (req.file && req.file.url) {
        const updated = await actions.updateStudent(account_id, {
          profile_pic: req.file.url
        });
        res.status(200).json(updated);
      } else {
        res.status(400).json({ message: "Please provide an image to upload." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong uploading the picture." });
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
