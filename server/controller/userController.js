const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class Controller {
  static async register(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "email,password and name is required" });
    }
    try {
      let user = await User.findOne({ email });
      if (user) {
        // check if user is already exist
        return res.status(400).json({ message: "User already exists" });
      } else {
        user = new User({
          email,
          password,
          name,
        });
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save(); // saving instance to database
        res.status(201).json({ message: "User saved successfully" });
      }
    } catch (err) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async login(req, res) {
    const { email, password: plainPass } = req.body;
    try {
      console.log("masuk");
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
            /* istanbul ignore next */
            if (err) {
              throw new Error(err);
            } else res.status(200).json({ access_token: token });
          });
        } else {
          res.status(401).json({ message: "invalid email / password" });
        }
      } else {
        res.status(401).json({ message: "invalid email / password" });
      }
    } catch (err) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
