import { useGetBagsQuery } from "./bagsApiSlice"
import Bag from "./Bag"

const BagList = () => {

  const {
    data: bags,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBagsQuery(null, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
})

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error?.data?.message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
        )
  }

  if (isSuccess) {

      const { ids } = bags

      const tableContent = ids?.length
          ? ids.map(bagId => <Bag key={bagId} bagId={bagId} />)
          : null

      content = (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">Name</th>
                            <th scope="col" className="px-6 py-4">Region</th>
                            <th scope="col" className="px-6 py-4">User</th>
                            <th scope="col" className="px-6 py-4">Bagged?</th>
                            <th scope="col" className="px-6 py-4">Created</th>
                            <th scope="col" className="px-6 py-4">Updated</th>
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

export default BagList
