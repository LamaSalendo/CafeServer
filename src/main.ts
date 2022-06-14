import { Class, User } from "./Schemas";

import LocalStrategy from "passport-local";
import api from "./api";
import cors from "cors";
import createError from "http-errors";
import dotenv from "dotenv";
import express from "express";
import expressSession from "express-session";
import mongoose from "mongoose";
import morgan from "morgan";
import next from "next";
import passport from "passport";
import path from "path";

const sessions = new Map<string, string>();

const Domain = "localhost";

dotenv.config();
mongoose.connect(
  "mongodb+srv://solomon:j7adeCT8OzkotaO7@main.iiaq7.mongodb.net/?retryWrites=true&w=majority"
);

//@ts-ignore

const app = express();
const PORT = process.env.PORT || 3001;
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//@ts-ignore
//app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    //@ts-ignore
    req.header("origin") ||
      req.header("x-forwarded-host") ||
      req.header("referer") ||
      req.header("host")
  );
  next();
});
//@ts-ignore
// https://stackoverflow.com/a/45077057
app.use((err, req, res, next) => {
  if (err) {
    console.log("penis");
    return res.sendStatus(500);
  }
  next();
});
//@ts-ignore
passport.serializeUser((user: any, done) => {
  const CurrentUser = User.findOne({
    username: user.username,
    password: user.password,
  })
    .then((user) => {
      done(null, user.id);
    })
    .catch((err) => {
      done(err);
    });
});
passport.deserializeUser(async (id, done) => {
  if (!(await User.exists({ id }))) {
    done(null, "User not found");
    return;
  }
  User.findOne({ id })
    .then(async (doc: any) => {
      const {
        _doc: { _id, __v, ...user },
      } = doc;
      try {
        if (!(await Class.exists({ id: user.classID }))) {
          done(null, user);
          return;
        }
      } catch (err) {
        console.error(err);
        done(err);
      }

      Class.findOne({ id: user.classID })
        .then((data) => {
          const User = user;
          User.class = { name: data.name, id: data.id };
          done(null, User);
        })
        .catch((err) => {
          console.error(err);
          done(err);
        });
    })
    .catch((err) => {
      console.error(err);
      done(err);
    });
});

passport.use(
  //@ts-ignore
  new LocalStrategy((username, password, done) => {
    if (!User.exists({ username, password })) {
      done("Not allowed");
      return;
    }
    User.findOne({ username, password })
      .then((user) => {
        done(null, user);
        return;
      })
      .catch((err) => {
        console.error(err);
        done(err);
        return;
      });
  })
);

app.use(
  expressSession({
    secret: "ophgreoighe98rt4erz843ter",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
//j7adeCT8OzkotaO7
export { sessions };
