import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Home Page", posts, css: "post.css" });
});

app.get("/create", (req, res) => {
  res.render("createPosts.ejs", { title: "Posts", css: "post.css" });
});

let posts = [];
let postIdCounter = 1;

app.post("/submit", (req, res) => {
  posts.push({
    id: postIdCounter++,
    title: req.body.title,
    content: req.body.content,
  });

  res.render("index.ejs", {
    posts: posts,
  });
});

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.redirect("/");
});

app.get("/update/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).send("Post not found");
  } else {
    res.render("updatePosts.ejs", {
      id: post.id,
      title: post.title,
      post: post.content,
      css: "/post.css",
    });
  }
});

app.post("/update/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
