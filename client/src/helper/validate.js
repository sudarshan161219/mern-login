import { toast } from "react-hot-toast"


// validate login page username
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values)
    return errors
}

// validate password page  (user password)
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values)
    return errors
}

// validate reset page (reset password) 
export async function resetPasswordValidation(values) {
    const errors = resetpasswordVerify({}, values)
    return errors
}

// ********************************************************** //


// validate username
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!')
    } else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid username...!")
    }

    return error
}

// validate password
function passwordVerify(error = {}, values) {

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        error.password = toast.error('Password Required...!')
    } else if (values.password.includes(" ")) {
        error.password = toast.error("Wrong Password...!")
    } else if (values.password.length < 4) {
        error.password = toast.error("Password must be more than 4 characters long...!")
    } else if (!specialChars.test(values.password)) {
        error.password = toast.error("Password must have special character");
    }

    return error
}

// validate reset password
function resetpasswordVerify(error = {}, values) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
    if (values.password !== values.confirm_pwd) {
        error.exist = toast.error("Password not match...!")
    }
    else if (!values.password) {
        error.password = toast.error('Password Required...!')
    } else if (values.password.includes(" ")) {
        error.password = toast.error("Wrong Password...!")
    } else if (values.password.length < 4) {
        error.password = toast.error("Password must be more than 4 characters long...!")
    } else if (!specialChars.test(values.password)) {
        error.password = toast.error("Password must have special character");
    }

    return error

    return error
}