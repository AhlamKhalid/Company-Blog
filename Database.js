// built-in pkg to format a URL
const url = require("url");

// installed pkg: sqlite
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
    // expect one row as a result, use "get" method
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
    const id = this.getId();
 
    this.command =
      "INSERT INTO articles (id, title, content, image, added_at, type) VALUES (?, ?, ?, ?, DATE('now', 'localtime'), ?)";

    db.run(this.command, [id, title, content, image, type]);

    // response
    // direct browser to another page & 
    // send query string
    response.redirect(
      url.format({
        pathname: `http://localhost:8080/${type}`,
        query: {
          added: true
        }
      })
    );
  }

  // get new article id 
  static getId() {
    // get id of last inserted article
    this.command = "SELECT id FROM articles ORDER BY id DESC LIMIT 1;";
    db.get(this.command, (error, value) => {
      if (error) {
        response.send(`Error: ${error.message}`);
      } else {
        return checkLastId(value);
      }
    });
  }
}

// responsible of sending result: either error
// if something goes wrong or the result as json
const sendResult = (error, rows, response) => {
  if (error) {
    response.send(`Error: ${error.message}`);
  } else {
    response.json(rows);
  }
};

// check if an image was uploaded
const imageValue = request => {
  // no image
  if (!request.file) {
    return null;
  } 
  // get the name created by multer
  else {
    return request.file.filename;
  }
};

// check if there is an article in db
const checkLastId = value => {
  // db contains articles
  if (value) {
    const lastId = value.id;
    return lastId + 1;
  } else {
    // no previous articles
    return 1;
  }
};

// export
module.exports = Database;
