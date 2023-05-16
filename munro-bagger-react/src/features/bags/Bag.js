import React from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectBagById } from './bagsApiSlice'
import { FiEdit } from 'react-icons/fi';


const Bag = ({ bagId }) => {
  const bag = useSelector(state => selectBagById(state, bagId))

  const navigate = useNavigate()

  if (bag) {
    const created = new Date(bag.createdAt).toLocaleString('en-UK', { day: 'numeric', month: 'long' })

    const updated = new Date(bag.updatedAt).toLocaleString('en-UK', { day: 'numeric', month: 'long' })

    const handleEdit = () => navigate(`/munrosbagged/${bagId}`)

      return (
        <tr className="border-b transition duration-300 ease-in-out hover:bg-emerald-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td className="whitespace-nowrap px-6 py-4">{bag.munro}</td>
            <td className="whitespace-nowrap px-6 py-4">Munro Region</td>
            <td className="whitespace-nowrap px-6 py-4">{bag.user.username}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {bag.bagged
                ? <span className="whitespace-nowrap px-6 py-4">Bagged</span>
                : <span className="whitespace-nowrap px-6 py-4">Not Bagged</span>
              }
            </td>
            <td className="whitespace-nowrap px-6 py-4">{created}</td>
            <td className="whitespace-nowrap px-6 py-4">{updated}</td>
            {/* need to add the user name and munro name by linking */}
            <td className="whitespace-nowrap px-6 py-4">
                <button
                    className=""
                    onClick={handleEdit}
                >
                    <FiEdit/>
                </button>
            </td>
        </tr>
      )
  } else return null
}

export default Bag
