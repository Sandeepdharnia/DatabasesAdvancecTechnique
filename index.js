
const express = require('express');
const bodyParser= require ("body-parser");
const app = express();
const mysql = require ("mysql");
const port = 8084;
const db = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "password",
    port: 3306,
    database: "LifeExpectancy"
    });
    // connect to database
    db.connect((err) => {
    if (err) {
    throw err;
    }
    console.log("Connected to database");
    });
    global.db = db;


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
require("./routes/main")(app);


app.set("views",__dirname+"/views");
app.set("view engine", "ejs");
app.engine("html",require("ejs").renderFile);
app.listen(port, ()=>console.log(`Example app listening on port ${port}!`));