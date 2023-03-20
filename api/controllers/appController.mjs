import UserModel from "../model/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.mjs";
import User from "../model/User.mjs";

//* middleware for verify user*//
const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    //$ check user existance
    let exist = await UserModel.findOne({ username });
    if (!exist) {
      return res.status(404).send({ err: "Can't find User!" });
    }
    next();
  } catch (error) {
    return res.status(404).send({ err: "Authentication Error" });
  }
};

// * POST: http://localhost:8080/api/register //
//? @param : {
//?  -->  "username": example123,
//?  -->  "password": admin@123,
//?  -->  "email": example90956@gmail.com,
//?  -->  "firstname": bill,
//?  -->  "lastname": gates,
//?  -->  "mobile": 8009550869,
//?  -->  "address": Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC,
//?  -->  "profile": "",
//?  }
const register = async (req, res) => {
  try {
    const { username, password, email, profile } = req.body;

    //$ check the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username" });

        resolve();
      });
    });

    //$ check the existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique Email" });

        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedpassword) => {
              const user = new UserModel({
                username,
                password: hashedpassword,
                profile: profile || " ",
                email,
              });
              //$ return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                )
                .catch((err) => {
                  return res.status(500).send({ err });
                });
            })
            .catch((err) => {
              return res.status(500).send({
                err: err + "Enable to hash password",
              });
            });
        }
      })
      .catch((err) => {
        return res.status(500).send({ err });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// * POST: http://localhost:8080/api/login //
//? @param : {
//?  -->  "username": "example123",
//?  -->  "password": "admin@123",
//?  }
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send({ err: "Don't have password" });
            }
            //$ Create JWT Token
            const token = jwt.sign(
              {
                userID: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successful....!",
              username: user.username,
              JWTtoken: token,
            });
          })
          .catch((err) => {
            return res.status(400).send({ err: "password does not match" });
          });
      })
      .catch((err) => {
        return res.status(400).send({ err: "username not found" });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// * GET: http://localhost:8080/api/user/example123 //
const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(501).send({ err: "Invalid username" });
    }

    UserModel.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).send({ err });
      }
      if (!user) {
        return res.status(501).send({ err: "Couldn't FInd the User" });
      }

      //** Remove password from user*/
      //** mongoose return unnecesary data with object so convert it into json*/
      const { password, ...rest } = Object.assign({}, user.toJSON());

      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ err: "Connot Find User Data" });
  }
};

// * PUT: http://localhost:8080/api/updateuser
//? @param : {
//?  -->  "id": <userId>,
//?  }
//? body: {
//?  -->  "firstname": " ",
//?  -->  "address": " ",
//?  -->  "profile": " "
//?}
const updateUser = async (req, res) => {
  res.json("updateUser route");
};

// * GET: http://localhost:8080/api/generateOTP //
const generateOTP = async (req, res) => {
  res.json("generateOTP route");
};

// * GET: http://localhost:8080/api/verifyOTP //
const verifyOTP = async (req, res) => {
  res.json("verifyOTP route");
};

//? successfully redirect user when OTP is valid //
// * GET: http://localhost:8080/api/createResetSession //
const createResetSession = async (req, res) => {
  res.json("createResetSession route");
};

// * PUT: http://localhost:8080/api/resetPassword //
const resetPassword = async (req, res) => {
  res.json("resetPassword route");
};

export {
  verifyUser,
  register,
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
