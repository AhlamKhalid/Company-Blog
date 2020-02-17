// sqlite
const sqlite3 = require("sqlite3");

// connect to database
const db = new sqlite3.Database("blogDB.db");

// Utility class
class Database {
  // Define a property "command"
  constructor() {
    this.command = "";
  }

  // get all articles
  static getAll(response) {
    //   command
    this.command = "SELECT * FROM articles;";
    // Query the database
    db.all(this.command, (error, rows) => sendResult(error, rows, response));
  }

  // get section's articles
  static getSection(section, response) {
    this.command = "SELECT * FROM articles WHERE type = ?;";
    db.all(this.command, [section], (error, rows) =>
      sendResult(error, rows, response)
    );
  }

  // get an article
  static getArticle(section, id, response) {
    this.command = "SELECT * FROM articles WHERE type = ? AND id = ?;";
    db.get(this.command, [section, id], (error, rows) =>
      sendResult(error, rows, response)
    );
  }

  // add an article
  static addArticle(request, response) {
    //   get all data
    const title = request.body.title;
    const content = request.body.content;
    const image = imageValue(request);
    const type = request.params.section;
    // to be changed every insertion cuz it's PRIMARY KEY
    const id = 5;

    this.command =
      "INSERT INTO articles (id, title, content, image, added_at, type) VALUES (?, ?, ?, ?, DATE('now', 'localtime'), ?)";

    db.run(this.command, [id, title, content, image, type]);

    // response
    response.redirect(`http://localhost:8080/${type}`);
  }
}

// responsible of sending result: either error
// if something goes wrong or the requested result
const sendResult = (error, rows, response) => {
  if (error) {
    response.send(`Error: ${error.message}`);
  } else {   
    response.json(rows);
  }
};

// check if an image was uploaded
const imageValue = request => {
  if (!request.file) {
    return null;
  } else {
    let ext = "";
    if (request.file.mimetype === "image/jpeg") {
      ext = ".jpg";
    } else if (request.file.mimetype === "image/png") {
      ext = ".png";
    }
    return request.file.filename + ext;
  }
};

// export
module.exports = Database;
