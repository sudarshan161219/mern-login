import {Router} from "express"
const router = Router()


//* Post Methods
router.route("/register").post((req, res) => { res.json("Register route")})
router.route("/registerMail").post()  //$ send the email
router.route("/authenticate").post()  //$ authenticate user
router.route("/login").post()  //$ login in app

//* GET Methods
router.route("/user/:username").get()  //$ user with username
router.route("/generateOTP").get()  //$ generate random OTP
router.route("/verifyOTP").get()  //$ verify generate OTP
router.route("/createResetSession").get()  //$ reset all the variables


//* PUT Methods
router.route("/updateuser").put()  //$ is use to update the user profile
router.route("/resetpassword").put() 

export default router