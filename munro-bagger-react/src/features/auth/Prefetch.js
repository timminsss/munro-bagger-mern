// this file is to keep the subscription open for the entirity of a user being logged in
// instead of it timing out too quickly (60s)
import { store } from '../../app/store'
import { bagsApiSlice } from '../bags/bagsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  useEffect(() => {
    // only run when component mounts
      console.log('subscribing')
      // manual subscription
      const notes = store.dispatch(bagsApiSlice.endpoints.getBags.initiate())
      const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

      // for when you leave protected pages
      return () => {
          console.log('unsubscribing')
          notes.unsubscribe()
          users.unsubscribe()
      }
  }, [])

  return <Outlet />
}
export default Prefetch
