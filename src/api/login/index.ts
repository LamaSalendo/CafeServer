import { Error as ErrorType } from "../../Types";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/",
  passport.authenticate("local", { failureMessage: "Wrong information" }),
  (req, res) => {
    //res.status(200);
    //res.send({ message: "Logged in successfully!" });
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ success: true, redirectURI: "/" });
    res.end();
  }
);

router.get("/", (req, res) => {
  if (!req.user || req.user === ErrorType.userNotFound) {
    //res.status(404);
    //req.logout();
    /*
    ! FIXME logout sends error.
    ! Needs callback function
    ! Required to logout user to prevent ongoing errors
     */
    res.status(400).send({ success: false, redirectURI: "/login" });
    res.end();
    return;
  }
  const { admin, recentOrder, ...response }: any = req.user;
  res.status(200);
  res.send({ success: true, message: response, redirectURI: "/" });
  res.end();
});
export default router;
