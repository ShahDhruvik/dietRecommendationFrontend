import React, { useEffect } from 'react'
import jwt_decaode from 'jwt-decode'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AI from './axiosInstance'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const nav = useNavigate()
  const handleCallbackResponse = (res) => {
    console.log('Encoded JWT id token' + res.credential)
    const user = jwt_decaode(res.credential)
    console.log(user)
  }
  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        '337101849292-mqnd350nik2vme4uk57kajl0a62h8un7.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(document.getElementById('googleBtn'), {
      theme: 'outline',
      size: 'extra-large',
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        const loginInfo = {
          identifier: email,
          password: password,
        }
        const res = await AI.post('/auth/local', loginInfo)
        console.log(res.data)
        const loginData = res.data
        const user = res.data.user
        if (loginData.jwt) {
          nav('dashboard', { state: { user } })
        }
      } catch (error) {}
    },
  })
  return (
    <section className="min-h-screen p-5 flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-2 md:space-y-3"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Address
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="name@company.com"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="••••••••"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                LogIn
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
            <div id="googleBtn" className="px-8"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
