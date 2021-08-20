const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class Controller {
  static async register(req, res) {
    const { email, password } = req.body;

    try {
      if (!email && !password)
        return res
          .status(404)
          .json({ message: "email/password cant be empty" });
      let user = await User.findOne({ email });
      if (user) {
        // check if user is already exist
        return res.status(400).json({ message: "User already exists" });
      } else {
        user = new User({
          email,
          password,
        });
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save(); // saving instance to database
        res.status(201).json({ message: "User saved successfully" });
      }
    } catch (err) {
      if (err.errors !== undefined) {
        res.status(400).json({ message: "email/password is required" });
      } else res.status(500).json({ message: "Internal server error" });
    }
  }
  static async login(req, res) {
    const { email, password: plainPass } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        if (bcrypt.compareSync(plainPass, user.password)) {
          const payload = {
            user: {
              id: user.id,
              email: user.email,
            },
          };
          jwt.sign(payload, "SECRET", { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ access_token: token });
          });
        } else {
          res.status(401).json({ message: "invalid email / password" });
        }
      } else {
        res.status(401).json({ message: "invalid email / password" });
      }
    } catch (err) {
      if (err.errors !== undefined) {
        res.status(400).json({ message: "email/password is required" });
      } else res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
