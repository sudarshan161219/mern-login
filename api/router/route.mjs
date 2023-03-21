import { Router } from "express";
const router = Router();

//*--> Import all controllers  <--*//
import * as controller from "../controllers/appController.mjs";
import { Auth, localvariables } from "../middleware/auth.mjs";
import { registerMail } from "../controllers/mailer.mjs"

//* Post Methods
router.route("/register").post(controller.register);
router.route("/registerMail").post( registerMail)  //$ send the email
router.route("/authenticate").post((req, res) => {
  res.end();
}); //$ authenticate user
router.route("/login").post(controller.verifyUser, controller.login); //$ login in app

//* GET Methods
router.route("/user/:username").get(controller.getUser); //$ user with username
router
  .route("/generateOTP")
  .get(controller.verifyUser, localvariables, controller.generateOTP); //$ generate random OTP
router.route("/verifyOTP").get(controller.verifyOTP); //$ verify generate OTP
router.route("/createResetSession").get(controller.createResetSession); //$ reset all the variables

//* PUT Methods
router.route("/updateuser").put(Auth, controller.updateUser); //$ is use to update the user profile
router.route("/resetpassword").put(controller.verifyUser, controller.resetPassword); //$ is use to reset  the user password

export default router;
