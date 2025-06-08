const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let port = 8080;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'MicrosofT1!t'
});

let getUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password()
  ];
}

// Home Route
app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) AS count FROM user`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let count = result[0].count;
            res.render("home.ejs", {count});
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in database");
    }
});

// Show Route
app.get("/user", (req, res) => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (err, users) => {
            if(err) throw err;
            let data = users;
            res.render("users.ejs", { data });
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in database");
    }
});

// Edit Route
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs", {user});
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in database");
    }
});

// UPDATE (DB) Route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let {password: formPass, username: newUsername} = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0];
      if (formPass != user.password) {
        res.send("Wrong Password!");
      } else {
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        try {
          connection.query(q2, (err, result) => {
            if(err) throw err;
            res.redirect("/user");
          })
        } catch (err) {
            console.log(err);
            res.send("Some error in database");
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in database");
  }
});

// Add Route
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user", (req, res) => {
  const { email, username, password } = req.body;
  const id = uuidv4();

  const q = `INSERT INTO user (id, email, username, password) VALUES (?, ?, ?, ?)`;
  const values = [id, email, username, password];

  try {
    connection.query(q, values, (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("Some error occurred while inserting the user.");
  }
});

// Delete User Route
app.get("/user/delete", (req, res) => {
  res.render("delete.ejs");
});

app.post("/user/delete", (req, res) => {
  const { email, password } = req.body;
  const q = `SELECT * FROM user WHERE email = ? AND password = ?`;
  
  connection.query(q, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Some error in database");
    }
    if (result.length === 0) {
      return res.send("Invalid email or password!");
    }
    
    const deleteQuery = `DELETE FROM user WHERE email = ?`;
    connection.query(deleteQuery, [email], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Error while deleting user.");
      }
      res.redirect("/user");
    });
  });
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
