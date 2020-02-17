// Middleware for parsing files AKA images

// multer
const multer = require("multer");
// path
// const path = require("path");

// image configuration
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function(request, file, callback) {
    callback(null, Date.now() + "-" + file.fieldname);
  }
});
// init multer
const upload = multer({ storage });

// export
module.exports = upload;
