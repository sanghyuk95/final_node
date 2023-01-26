const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(session({ secret: "비밀코드", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session()); 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("SVG"));

app.use(express.urlencoded({ extended: true }));

app.listen(8080, function () {
  console.log("listening on 8080");
});

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "database-1.cixoxvhojmog.ap-northeast-2.rds.amazonaws.com",
  user: "shskse5",
  password: "chltkdgur5",
  database: "final_project",
});

connection.connect(function (err) {
  if (err) {
    console.error("연결실패 :" + err.stack);
    return;
  }
  console.log("연결된듯");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/myPage", function (req, res) {
  connection.query("SELECT * from test", function (err, result, field) {
    if (err) {
      console.log(err);
    }
    console.log("result : ", result);
    res.render("myPage.ejs", { data: result });
  });
});
