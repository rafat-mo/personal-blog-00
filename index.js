import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Home Pgae", posts });
});

app.get("/create", (req, res) => {
  res.render("createPosts.ejs", { title: "Posts", css: "/post.css" });
});

let posts = [];
let postIdCounter = 1;

app.post("/submit", (req, res) => {
  let postHeading = req.body["title"];
  let postBody = req.body["content"];
  posts.push({
    id: postIdCounter++,
    title: postHeading,
    postContent: postBody,
  });
  res.render("index.ejs", {
    postTitle: postHeading,
    postContent: postBody,
    posts,
  });
});

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.redirect("/");
});

app.get("/update/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.findIndex((post) => post.id === postId);
  let postTitle = req.body["title"];
  let postContent = req.body["content"];
  if (post !== -1) {
    res.render("updatePosts.ejs", {
      title: postTitle,
      post:  postContent,
      css: "/post.css",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
