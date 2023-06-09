import { toast } from "react-hot-toast";
import { authenticate } from "./helper.mjs";

// validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  if (values.username) {
    //$ check user exist or not
    const { status } = await authenticate(values.username);
    if (status !== 200) {
      errors.exist = toast.error("User dose not exist....!");
    }
  }
  return errors;
}

// validate password page  (user password)
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

// validate reset page (reset password)
export async function resetPasswordValidation(values) {
  const errors = resetpasswordVerify({}, values);
  return errors;
}

// validate profile page
export async function profileValidation(values) {
  const error = emailVerify({}, values);
  return error;
}

// validate register page (register form)
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}

// ********************************************************** //

// validate email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}

// validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid username...!");
  }

  return error;
}

// validate password
function passwordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Password must be more than 4 characters long...!"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }

  return error;
}

// validate reset password
function resetpasswordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (values.password !== values.confirm_pwd) {
    error.exist = toast.error("Password not match...!");
  } else if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Password must be more than 4 characters long...!"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }

  return error;

  return error;
}
