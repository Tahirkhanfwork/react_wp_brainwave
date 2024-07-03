import axios from "axios";
import { useDispatch } from "react-redux";
import { loginActions } from "../slice/loginSlice";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const enteredUsername = event.target.username.value;
    const enteredPassword = event.target.password.value;
    const loginData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    const BASE_URL = "http://localhost/wp_brainwave/wp-json/wp/v2";

    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jwtToken = response.data.jwt_token;
      const expirationTime = response.data.expiration_time;
      dispatch(
        loginActions.login({
          jwt_token: jwtToken,
          expiration_time: expirationTime,
        })
      );
    } catch (error) {
      setShowError(true);
      setError(error.message);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">An error occured!</strong>
              <span className="block sm:inline">
                {error}
              </span>
            </div>
          )}

          {error &&
            setTimeout(() => {
              setError(false);
            }, 3000) &&
            null}

          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
