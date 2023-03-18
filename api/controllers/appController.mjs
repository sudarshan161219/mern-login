import UserModel from "../model/User.mjs";
import bcrypt from "bcrypt";

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
//?  -->  "username": example123,
//?  -->  "password": admin@123,
//?  }
const login = async (req, res) => {
  res.json("login route");
};

// * GET: http://localhost:8080/api/user/example123 //
const getUser = async (req, res) => {
  res.json("getUser route");
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
  register,
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
