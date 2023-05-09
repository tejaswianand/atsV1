const router = require("express").Router();
const Applications = require("../Models/Applications");

router.post("/", async (req, res) => {
  try {
    const newApplication = new Applications({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      ewb: req.body.ewb,
      eab: req.body.eab,
      exp: req.body.exp,
      dob: req.body.dob,
      salary: req.body.salary,
      jid: req.body.jid,
      resume: req.body.resume,
    });
    const application = await newApplication.save();

    res.status(200).json(application);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/check/:id", async (req, res) => {
  try {
    const findApplication = await Applications.findById(
      req.params.id
    )
    if (findApplication) {
      res.status(200).json(findApplication)
    }
  } catch (err) {

  }
});




// Get all applications

router.get("/view-all", async (req, res) => {
  let posts;
  posts = await Applications.find();


  res.status(200).json(posts);
  console.log(posts);

});


module.exports = router;
