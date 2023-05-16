import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const USER_REGEX = /^[A-Za-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  // this is not called until ready to call it
  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)

  useEffect(() => {
      setValidUsername(USER_REGEX.test(username))
    }, [username])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
      setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
      if (isSuccess) {
          setUsername("")
          setEmail("")
          setPassword("")
          navigate("/user/users")
          console.log("is success")
      }
  }, [isSuccess, navigate])

  const onUsernameChanged = e => {
    setUsername(e.target.value)
  }
  const onEmailChanged = e => {
    setEmail(e.target.value)
  }
  const onPasswordChanged = e => {
    setPassword(e.target.value)
  }

  const canSave = [validUsername, validEmail, validPassword].every(Boolean) && !isLoading

  const onSaveUserClicked = async (e) => {
      e.preventDefault()
      // console.log("trying to save")
      if (canSave) {
          await addNewUser({ username, email, password, roles: "user" })
      }
  }

  const errClass = isError ? "visible bg-red-50 m-3 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-red-100 dark:border-red-400" : "invisible"
  // TO COME BACK TO FOR ERROR CHECKING
  // const validUserClass = !validUsername ? "bg-red-50 m-3 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-red-100 dark:border-red-400" : ""
  // const validPwdClass = !validPassword ? "bg-red-50 m-3 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-red-100 dark:border-red-400" : ""

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <div className="m-5 block max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-neutral-700">
        <form onSubmit={onSaveUserClicked}>
          <h2 className="text-xl mb-3">New User</h2>
          {/* Email */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white"
              htmlFor="email">
                Email
            </label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                id="email"
                name="email"
                type="text"
                autoComplete="off"
                placeholder="Email"
                onChange={onEmailChanged}
                required
                // value={email}
            />
          </div>
          {/* Username */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white"
              htmlFor="username">
                Username <span className="nowrap">(3-20 letters)</span></label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                placeholder="Username"
                value={username}
                onChange={onUsernameChanged}
                required
            />
          </div>
          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white"
              htmlFor="password">
                Password <span className="nowrap">(4-12 characters including !@#$%)</span></label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                id="password"
                name="password"
                type="password"
                value={password}
                placeholder="********"
                onChange={onPasswordChanged}
                required
            />
          </div>
          <button
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
              disabled={!canSave}
              type="submit"
          >
              Submit
          </button>
        </form>
      </div>
    </>
)

return content
}

export default NewUserForm
