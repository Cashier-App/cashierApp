const jwt = require("jsonwebtoken");

const authentification = (req, res, next) => {
  let access_token = req.headers.access_token;
  if (!access_token) {
    res.status(401).json({ error: "you must login first" });
  } else {
    try {
      let payload = jwt.verify(access_token, "SECRET");
      req.user = payload.user;
      next();
    } catch (err) {
      /* istanbul ignore next */
      res.status(401).json({ error: "authentication failed" });
    }
  }
};

module.exports = { authentification };
