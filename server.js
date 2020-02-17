// express
const express = require("express");

// image parser
const upload = require("./img-parser");

// Database operations
const Database = require("./Database");

// cors
const cors = require("cors");

// init express
const app = express();

// port
const port = 3000;

// static files
app.use("/uploads", express.static("uploads"));

// use cors
app.use(cors());

// get all articles
// http://localhost:3000/
app.get("/", (request, response) => {
  Database.getAll(response);
});

// get section's articles
// e.g. http://localhost:3000/tip
app.get("/:section", (request, response) => {
  // what section ?
  const section = request.params.section;
  Database.getSection(section, response);
});

// get an article
// e.g. http://localhost:3000/tip/2
app.get("/:section/:id", (request, response) => {
  // what section & id ?
  const section = request.params.section;
  const id = request.params.id;
  Database.getArticle(section, id, response);
});

// add an article
app.post("/:section", upload.single("uploadedImg"), (request, response) => {

  // check extension
  /* let ext;
  if (request.file.mimetype === "image/jpeg") {
    ext = ".jpg";
  } else if (request.file.mimetype === "image/png") {
    ext = ".png";
  }
  console.log(ext); */
  
  Database.addArticle(request, response);
});

// server listening
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

// for testing
/* "title": "Educate is wealth",
"content": "Invest in yourself in whatever way you like. having fun while leaning is what is all about what passion means" */
