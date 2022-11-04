const db = require("../db.js");
const jwt = require('jsonwebtoken')

const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM blog WHERE category = ?"
    : "SELECT * FROM blog LIMIT 4";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
};

const getPost = (req, res) => {
  const q = "SELECT * FROM blog,user WHERE blog.userid = user.id and b_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
};

const createPost = (req, res) => {
 
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "This is s Secret", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")});

  const { userid, description, title, blogimage, category, date } = req.body;
  console.log(req.body);
  const q =
    "INSERT INTO blog (`title`, `description`, `userid`, `blogimage` , `date`, `category`) values (?)";
  const values = [title, description, userid, blogimage, date, category];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    res.status(200).json("Blog Successfully Added");
  });
  //    res.json("Data is Recived Successfully")
};

const deletePost = (req, res) => {
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "This is s Secret", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")});

  const q = "DELETE FROM blog WHERE b_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
};

const updatePost = (req, res) => {
if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "This is s Secret", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")});

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
};
