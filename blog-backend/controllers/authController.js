const db = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// console.log(db);

const register = (req, res) => {
  const { username, password, email } = req.body;
  const q1 = "SELECT * FROM user WHERE email = ? OR username = ?";

  db.query(q1, [email, username], (err, data) => {
    if (err) {
      return res.status(501).json(err);
    }

    if (data.length) {
      return res.json(
      "User Already Exist!",
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(password, salt);
    const q2 = "INSERT INTO user (`username`,`password`,`email`) VALUES (?)";
    const values = [username, hashed_password, email];
    db.query(q2, [values], (err, data) => {
      if (err) {
        return res.status(501).json(err);
      }
      return res.status(200).json("User is created successfully");
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM user WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) {
      return res.json(err);
    }

    
    if (data.length === 0) {
      console.log(data)
      return res.json("User Does Not Exist!");
    }

    const user = data[0];

    const isCorrect = bcrypt.compareSync(password, user.password);

    if (isCorrect) {
      const token = jwt.sign({ id: user.id }, "This is s Secret");
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ ...user, password: null });
    } else {
      return res.json("Bad Credentials!");
    }
  });
};

const logout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Successfully Logout");
};

module.exports = {
  login,
  logout,
  register,
};
