import axios from "axios";


axios.defaults.baseURL = import.meta.env.BASE_URL
//* Make API Requests //

//* Authenticate function  //
const authenticate = async (username) => {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist.....!" };
  }
};

//* get User details  function //
const getUser = async ({ username }) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match.....!" };
  }
};

//* Register user  function  //
const registerUser = async (credentials) => {
  try {
    const {
      data: { msg },
      status,
    } = axios.post(`api/register`, credentials);
    let { username, email } = credentials;
    //$ send email //
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
};

//* Login user  function  //
const loginUser = async ({ username, password }) => {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password does't Match....!" });
  }
};

//* update user profile  function  //
const updateUser = async (response) => {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't  Update Profile....!" });
  }
};

//* Generate OTP  function  //
const generateOTP = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    //$ send mail with the OTP //
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}, Verify and recover your password`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
};

//* Verify OTP  function  //
const verifyOTP = async ({ username, code }) => {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error });
  }
};

//* Reset Password  function  //
const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.put("/api/resetpassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
};

export {
  authenticate,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  generateOTP,
  verifyOTP,
  resetPassword,
};
