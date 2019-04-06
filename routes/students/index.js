const router = require("express").Router();

const actions = require("./students");
const cloudParser = require("../../config/cloudinary");
const restricted = require("../../middleware/restricted");

module.exports = router;

router
  .route("/update")
  .post(restricted, cloudParser.single("image"), async (req, res) => {
    const info = req.body;
    const account_id = req.token.subject;
    if (req.file) {
      info = {
        ...info,
        profile_pic: req.file.url
      };
    }

    try {
      const updated = await actions.updateStudent(account_id, info);
      res.status(200).json(updated);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong update the user information." });
    }
  });

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
