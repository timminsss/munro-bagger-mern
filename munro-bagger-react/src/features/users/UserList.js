import { useGetUsersQuery } from "./usersApiSlice"
import { Link } from "react-router-dom"
import User from './User'
import { FiUserPlus } from 'react-icons/fi';

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(null, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    }) // to reset the info every time the focus is off of the page

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = (
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{error?.data?.message}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
          )
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
          <div className="flex flex-col">
          <Link to="/user/users/new">
              <button
                className="m-5 text-xl text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-lg w-full sm:w-auto px-5 py-5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                title="Create User">
                 <div className="flex">
                  <p className="mr-3">Sign up</p>
                  <FiUserPlus/>
                  </div>
              </button>
            </Link>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                              <th scope="col" className="px-6 py-4">Username</th>
                              <th scope="col" className="px-6 py-4">Email</th>
                              <th scope="col" className="px-6 py-4">Roles</th>
                              <th scope="col" className="px-6 py-4">Edit</th>
                          </tr>
                      </thead>
                      <tbody>
                          {tableContent}
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
    }

    return content
}
export default UsersList
