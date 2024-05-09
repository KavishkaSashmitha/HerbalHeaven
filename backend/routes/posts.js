const express = require("express");
const Posts = require("../model/posts");

const router = express.Router();

//save posts
router.post("/post/save", async (req, res) => {
  let newPost = new Posts(req.body);

  const existingPost = await Posts.findOne({
    $or: [{ email: req.body.email }, { nic: req.body.nic }],
  });
  if (existingPost) {
    return res.status(400).json({ error: "Email or NIC already exists" });
  }

  newPost
    .save()
    .then(() => {
      return res.status(200).json({
        success: "Posts saved successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});

//get posts

router.get("/posts", (req, res) => {
  Posts.find()
    .exec()
    .then((posts) => {
      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});

//get a specific post

router.get("/posts/:id", (req, res) => {
  let postId = req.params.id;

  Posts.findById(postId)
    .then((post) => {
      return res.status(200).json({
        success: true,
        post,
      });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
});

//update posts

router.put("/post/update/:id", (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then(() => {
      return res.status(200).json({
        success: "Updated Syccesfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

//delete post

router.delete("/post/delete/:id", (req, res) => {
  Posts.findByIdAndDelete(req.params.id)
    .exec()
    .then((deletedPost) => {
      return res.json({
        message: "Delete Succesfully",
        deletedPost,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Delete unsuccesfully",
        err,
      });
    });
});

//update salary

router.put("/post/salary/:id", (req, res) => {
  const { id } = req.params;
  const { month, amount } = req.body;

  const salaryUpdate = { [`salary.${month.toLowerCase()}`]: amount };
  Posts.findByIdAndUpdate(id, {
    $set: salaryUpdate,
  })
    .then(() => {
      return res.status(200).json({
        success: "Updated Syccesfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

router.get("/sallrypost", async (req, res) => {
  // Mark the function as async
  try {
    const salary = await Posts.find(); // Use await to wait for the promise to resolve
    if (!salary) {
      return res.status(404).json({ message: "salary not found" });
    }
    return res.status(200).json({ salary });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

//check user exist
router.post("/check-user", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await Posts.findOne({ email });

    if (!user) {
      return res.json({
        exists: false,
      });
    }

    // If user exists, check if the user is an admin
    if (user.jobrole === "Manager") {
      return res.json({
        exists: true,
      });
    } else {
      return res.json({
        exists: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
