const express = require("express");
const Posts = require("../model/posts");

const router = express.Router();

//save posts
router.post("/post/save", (req, res) => {
  let newPost = new Posts(req.body);

  // newPost.save((err) =>{
  //     if(err){
  //         return res.status(400).json({
  //             error:err
  //         });
  //     }
  //     return res.status(200).json({
  //         success:"Posts saved successfully"
  //     });
  // });

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
  // Posts.find().exec((err, posts) =>{
  //     if(err){
  //         return res.status(400).json({
  //             error:err
  //         });
  //     }
  //     return res.status(200).json({
  //         success:true,
  //         existingPosts:posts
  //     });
  // });

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

//check user exist
router.post("/check-user", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await Posts.findOne({ email });

    if (!user) {
      return res.json({
        exists: false,
        isAdmin: false, // Since the user doesn't exist, isAdmin is false
      });
      toast.fail("Your not a Manager");
    }

    // If user exists, check if the user is an admin
    if (user.isAdmin) {
      return res.json({
        exists: true,
        isAdmin: true,
      });
    } else {
      return res.json({
        exists: true,
        isAdmin: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
