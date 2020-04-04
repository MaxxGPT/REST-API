require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require("req-flash");
const session = require("express-session");
const passport = require("passport");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.set("view-engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "Test123" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
const articlesRouter = require("./routes/articles");
app.use("/articles", articlesRouter);

const sourcesRouter = require("./routes/sources");
app.use("/sources", sourcesRouter);

const userRouter = require("./routes/users");
app.use("/users", userRouter);

const authRouter = require("./routes/auth");
app.use("/register", authRouter);

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  //res.render('index.ejs')
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
const pagesRouter = require("./routes/pages");
app.use("/dashboard", pagesRouter);

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.listen(5000, () => console.log("Server Started"));
