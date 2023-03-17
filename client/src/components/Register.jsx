import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import {registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";


const Register = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "email90956@gmail.com",
      username: "example123",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile : file || '' })
      console.log(values);
    },
  });

  // formik doesn't support file upload so we need to create this handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-semi '>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Happay to join you.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
                <img className={styles.profile_img} src={file || avatar} alt='avatar' />
              </label>

              <input type='file' name='profile' id='profile' onChange={onUpload} />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type='text'
                placeholder='email'
              />

              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type='text'
                placeholder='username'
              />

              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type='password'
                placeholder='password'
              />

              <button
                className='btn border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center'
                type='submit'
              >
                Register
              </button>
            </div>

            <div className='text-center py-4'>
              <span className=' text-gray-500'>
                Already Registered?
                <Link className='text-red-500' to='/'>
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
