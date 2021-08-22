const validateImage = (req, res, next) => {
  const allowedType = ["image/jpeg", "image/jpg", "image/png"];
  if (!req.file && !req.params.id) {
    res.status(400).json({ message: "Image cant be empty" });
  } else {
    if (!req.file) {
      next();
    } else {
      //bytes
      if (req.file.size < 255000 && allowedType.includes(req.file.mimetype)) {
        next();
      } else {
        res.status(400).json({
          message:
            "Image file must be lower than 255Kb and extension must be jpeg,jpeg or png",
        });
      }
    }
  }
};

module.exports = validateImage;
