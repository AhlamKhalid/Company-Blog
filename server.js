// express
const express = require("express");

// init express
const app = express();

// port
const port = 3000;

// sqlite
const sqlite3 = require("sqlite3");

// multer
const multer = require("multer");

// image configuration
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.fieldname);
  }
});

// init multer
const upload = multer({ storage });

// connect to database
const db = new sqlite3.Database("blogDB.db");

// sqlite command
let command;

// get all articles
// http://localhost:3000/
app.get("/", (request, response) => {
  command = "SELECT * FROM articles;";
  db.all(command, (error, rows) => {
    if (error) {
      response.send(`Error: ${error.message}`);
    } else {
      response.json(rows);
    }
  });
});

// get section's articles
// e.g. http://localhost:3000/tip
app.get("/:section", (request, response) => {
  command = "SELECT * FROM articles WHERE type = ?;";
  db.all(command, [request.params.section], (error, rows) => {
    if (error) {
      response.send(`Error: ${error.message}`);
    } else {
      response.json(rows);
    }
  });
});

// get an article
// e.g. http://localhost:3000/tip/2
app.get("/:section/:id", (request, response) => {
  // command
  command = "SELECT * FROM articles WHERE type = ? AND id = ?;";
  db.get(command, [request.params.section, request.params.id], (error, row) => {
    if (error) {
      response.send(`Error: ${error.message}`);
    } else {
      response.json(row);
    }
  });
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

  // get data
  const title = request.body.title;
  const content = request.body.content;
  const image = request.file.filename;
  const type = request.params.section;
  // to be changed every insertion cuz it's PRIMARY KEY
  const id = 4;

  // command
  command =
    "INSERT INTO articles (id, title, content, image, added_at, type) VALUES (?, ?, ?, ?, DATE('now', 'localtime'), ?)";

  db.run(command, [id, title, content, image, type]);

  response.send("success");
});

// server listening
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

// for testing 
/* "title": "Educate is wealth",
"content": "Invest in yourself in whatever way you like. having fun while leaning is what is all about what passion means" */
