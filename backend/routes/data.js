const express = require("express");
const Data = require("../model/Data");
const routes = express.Router();
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");


//aws s3 bucket

const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

const s3 = new S3Client({
  region: process.env.REAGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECERET_ACCESS_KEY,
  },
});
const multer = require("multer")
// Multer setup to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory for processing
const upload = multer({ storage });




routes.post(
  "/adddata",
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), // Handle multiple file uploads
  fetchUser,
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("LinkedinURL").isURL(),
    body("GithubURL").isURL(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      // Check if data with the same userId exists
      const existingData = await Data.find({ userId: req.user.id });

      if (existingData.length > 0) {
        // Delete all data with the same userId
        await Data.deleteMany({ userId: req.user.id });
      }

      const uploadFile = async (file, filename) => {
        let contentType;

        // Determine content type based on file MIME type
        switch (file.mimetype) {
          case "image/jpeg":
          case "image/jpg":
            contentType = "image/jpeg";
            break;
          case "image/png":
            contentType = "image/png";
            break;
          case "image/gif":
            contentType = "image/gif";
            break;
          default:
            contentType = "application/octet-stream";
        }

        const uploadParams = {
          Bucket: process.env.Bucket,
          Key: filename,
          Body: file.buffer, // File content from memory
          ContentType: contentType,
        };

        const upload = new Upload({
          client: s3,
          params: uploadParams,
        });

        const response = await upload.done();
        return response.Location; // S3 URL
      };

      // Upload image and resume
      const profileimgUrl = await uploadFile(
        req.files["image"][0],
        `image-${Date.now()}-${req.files["image"][0].originalname}`
      );
      const resumeUrl = await uploadFile(
        req.files["resume"][0],
        `resume-${Date.now()}-${req.files["resume"][0].originalname}`
      );

      const {
        name,
        email,
        education,
        university,
        experience,
        Skills,
        project,
        LinkedinURL,
        GithubURL,
        Domain,
        aboutyou,
      } = req.body;
      const parsedProject =
        typeof project === "string" ? JSON.parse(project) : project;
        console.log("About You from req.body:", aboutyou);
      // Create new user data
      const userdata = new Data({
        name,
        email,
        education,
        university,
        experience,
        Skills,
        project: parsedProject,
        image: profileimgUrl,
        resume: resumeUrl,
        LinkedinURL,
        GithubURL,
        Domain,
        aboutyou,
        userId: req.user.id,
      });
      const savedata = await userdata.save();
      res.json({ success: true, savedata });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
);

//fetchuser data /api/data/fetch
routes.post("/fetch/:userId", async (req, res) => {
  try {
    //console.log("Fetching data for user:", req.user.id); // Add logging
    const user = await Data.findOne({
      userId: req.params.userId,
    }).sort({ date: -1 });

    if (!user) {
      return res.status(404).json({ success: false, error: "No data found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Server error:", err); // Add error logging
    res.status(400).json({ success: false, error: "Server Error" });
  }
});

//fetch userid from authtoken
routes.post("/fetchid",fetchUser,(req,res)=>{
  try {
    const userId = req.user.id;
    res.json({userId})
  } catch (error) {
    console.log(error)
  }
})
module.exports = routes;
