// installed pkg: express
const express = require("express");

// image parser
const upload = require("./img-parser");

// Database operations
const Database = require("./Database");

// installed pkg: cors
const cors = require("cors");

// init express
const app = express();

// port
const port = 3000;

// static files (images)
app.use("/uploads", express.static("uploads"));

// use cors to send requests between 
// the front & back end
app.use(cors());

// get all articles
// http://localhost:3000/
app.get("/", (request, response) => {
  Database.getAll(response);
});

// get section's articles
// e.g. http://localhost:3000/tip
app.get("/:section", (request, response) => {
  // get section 
  const section = request.params.section; 
  Database.getSection(section, response);
});

// get an article
// e.g. http://localhost:3000/tip/2
app.get("/:section/:id", (request, response) => {
  // get section & id 
  const section = request.params.section;
  const id = request.params.id;
  Database.getArticle(section, id, response);
});

// add an article
app.post("/:section", upload.single("uploadedImg"), (request, response) => {
  Database.addArticle(request, response);
});

// server listening
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});


