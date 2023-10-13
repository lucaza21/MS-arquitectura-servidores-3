const express = require("express");
const router = express.Router();

//import posts controller
const posts = require("../controllers/posts.controller");
const middleware = require("../middlewares/secure.middleware")

router.post("/api/posts", middleware.checkAuth, posts.create);
router.get("/api/posts", middleware.checkAuth, posts.list);
router.get("/api/posts/:id", middleware.checkAuth, posts.detail);
router.patch("/api/posts/:id", middleware.checkAuth, posts.update);
router.delete("/api/posts/:id", middleware.checkAuth, posts.delete);

router.get("/api/filter", middleware.checkAuth, posts.filter);

router.get("/", (req, res) => {
    res.json({ message: "Hello World" })
})

module.exports = router;