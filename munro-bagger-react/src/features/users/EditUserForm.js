import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate, Link } from "react-router-dom"
import { BiArrowBack } from 'react-icons/bi';

const USER_REGEX = /^[A-Za-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const email = user.email
    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            navigate('/user/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, email, username, password, active })
        } else {
            await updateUser({ id: user.id, email, username, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    let canSave
    if (password) {
        canSave = [validUsername, validPassword].every(Boolean) && !isLoading
      } else {
        canSave = [validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "visible bg-red-50 m-3 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-red-100 dark:border-red-400" : "invisible"
    // TO COME BACK TO FOR ERROR CHECKING
    // const validUserClass = !validUsername ? "bg-red-50 m-3 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-red-100 dark:border-red-400" : ""
    // const validPwdClass = password && !validPassword ? "bg-red-50 m-3 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-red-100 dark:border-red-400" : ""

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
    console.log(errContent)

    const content = (
        <>
            <Link to="/user/users">
              <button className="m-5 text-xl text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-lg w-full sm:w-auto px-5 py-5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                <BiArrowBack/>
              </button>
            </Link>
            <p className={errClass}>{errContent}</p>
            <div className="m-5 block max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-neutral-700">
              <form onSubmit={e => e.preventDefault()}>
                <h2 className="text-xl mb-3">Edit User</h2>
                <div>
                  {/* EMAIL */}
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white" htmlFor="username">
                      Email <span className="nowrap"></span></label>
                  <input
                    className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onUsernameChanged}
                    disabled
                  />
                  {/* USERNAME */}
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white" htmlFor="username">
                      Username <span className="nowrap">(3-20 letters)</span></label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                  />
                  {/* PASSWORD */}
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white" htmlFor="password">
                      Password
                      <p className="nowrap">Leave blank if no change</p>
                      <p className="nowrap">(4-12 chars letters and numbers)</p></label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="********"
                    onChange={onPasswordChanged}
                  />
                  <div className="my-5 flex justify-between">
                    <button
                      className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                      title="Save"
                      onClick={onSaveUserClicked}
                      disabled={!canSave}
                    >
                        Update Used
                    </button>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      title="Delete"
                      onClick={onDeleteUserClicked}
                    >
                        Delete User
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </>
    )

    return content
}
export default EditUserForm
