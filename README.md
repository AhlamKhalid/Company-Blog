# Company Blog

Company blog where user can publish articles. The blog has multiple sections: news, events and tips & advices. User can add a new article to any section. This blog is a fullstack website :). Built using Vue.js in the frontend and Node.js in the backend, yup fullstack Javascript website :) Also, it is fully responsive.

## Contents

- [Run project](#Run-project)
- [Features](#Features)
- [Technologies](#Technologies)
- [Demo](#Demo)

## Run project

**Backend**

### install dependencies

`npm install`

### start server

`node server`

#### or 

`nodemon server` (autoamtically restart server if file changes)

> _Note:_ `server` is a Javascript file where Node.js server is setup.

Because I built this website on Linux & run it on Windows, I had an error saying "can't find module sqlite3". The following steps solve this issue:

### install node-pre-gyp

`npm i -g node-pre-gyp`

### rebuild project

`npm rebuild`

### restart backend server 

**Frontend**

#### go to frontend folder

`cd frontend`

#### install dependencies

`npm install`

#### start server

`npm run serve`

### Features

- View articles in a section.
- Add an article to a section.
- Upload an image for the article.
- The blog is fully responsive.

### Technologies

- Vue.js
- Vue router
- axios
- Node.js
- Express
- RESTful API
- sqlite database

### Demo

![demo](demo.gif)
