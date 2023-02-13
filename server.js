const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const flash = require("connect-flash");

app.use(session({ secret: "비밀코드", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("SVG"));
app.use(flash());

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
app.get("/login", goMyPage, function (req, res) {
  res.render("login.ejs");
});

function goMyPage(req, res, next) {
  if (req.user) {
    res.redirect("/myPage");
  } else {
    next();
  }
}

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/fail",
  }),
  function (req, res) {
    res.redirect("/myPage");
  }
);

app.get("/fail", function (req, res) {
  res.redirect("/login");
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (id, pw, done) {
      connection.query(`SELECT id,password from login where id='${id}'`, function (err, result) {
        if (err) {
          return done(err);
        }
        if (!result) {
          return done(null, false, { message: "존재안함" });
        }
        if (pw === result[0].password) {
          return done(null, result[0]);
        } else {
          return done(null, false, { message: "비번틀림" });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  //디비에서 user.id 로 유저를 찾은뒤에 유저 정보를 밑에 중괄호에 넣음
  connection.query(`SELECT * from login where id='${id}'`, function (err, result) {
    done(null, result[0]);
  });
});

app.get("/signUp", function (req, res) {
  res.render("signUp.ejs");
});
app.post("/signUp", function (req, res) {
  connection.query(`insert into login (id,password,name) values ('${req.body.id}','${req.body.pw}','${req.body.name}')`, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/login");
});

app.get("/myPage", loggedIn, function (req, res) {
  res.render("myPage.ejs", { data: req.user });
});

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

let multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/imageupload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

app.post("/upload", upload.single("profile"), function (req, res) {
  const sql = `
  update login
  set profile = '${req.file.originalname}'
  where id='${req.user.id}'
  `;
  connection.query(sql, function (err, result, field) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/myPage");
});

app.get("/imageupload/:imageName", function (req, res) {
  res.sendFile(__dirname + "/public/imageupload/" + req.params.imageName);
});

app.get("/magazine", function (req, res) {
  res.sendFile(__dirname + "/views/magazine.html");
});
app.get("/magazineDetail", function (req, res) {
  res.sendFile(__dirname + "/views/magazineDetail.html");
});

app.get("/board", function (req, res) {
  const sql = `select * from community`;
  connection.query(sql, function (err, result) {
    console.log(result);
    if (err) {
      console.log(err);
    }
    res.render("boardreal.ejs", { data: result });
  });
});

app.post("/write", function (req, res) {
  res.redirect("/board");
});
app.get("/main", function (req, res) {
  res.sendFile(__dirname + "/views/main.html");
});
app.get("/product", function (req, res) {
  res.sendFile(__dirname + "/views/LIST.html");
});
app.get("/productDetail", function (req, res) {
  res.sendFile(__dirname + "/views/detailEnd.html");
});
