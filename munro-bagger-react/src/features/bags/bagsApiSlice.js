import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const bagsAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.bagged === b.bagged) ? 0 : a.bagged ? 1 : -1
})

const initialState = bagsAdapter.getInitialState()

export const bagsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getBags: builder.query({
          query: () => '/munrosbagged',
          validateStatus: (response, result) => {
              return response.status === 200 && !result.isError
          },
          keepUnusedDataFor: 5,
          transformResponse: responseData => {
              const loadedBags = responseData.map(bags => {
                  bags.id = bags._id
                  return bags
              });
              return bagsAdapter.setAll(initialState, loadedBags)
          },
          providesTags: (result, error, arg) => {
              if (result?.ids) {
                  return [
                      { type: 'Bags', id: 'LIST' },
                      ...result.ids.map(id => ({ type: 'Bags', id }))
                  ]
              } else return [{ type: 'Bags', id: 'LIST' }]
          }
      }),
      addNewBag: builder.mutation({
          query: initialBag => ({
              url: '/bags',
              method: 'POST',
              body: {
                  ...initialBag,
              }
          }),
          invalidatesTags: [
              { type: 'Bag', id: "LIST" }
          ]
      }),
      updateBag: builder.mutation({
          query: initialBag => ({
              url: '/bags',
              method: 'PATCH',
              body: {
                  ...initialBag,
              }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Bag', id: arg.id }
          ]
      }),
      deleteBag: builder.mutation({
          query: ({ id }) => ({
              url: `/bags`,
              method: 'DELETE',
              body: { id }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Bag', id: arg.id }
          ]
      }),
  }),
})

export const {
  useGetBagsQuery,
  useAddNewBagMutation,
  useUpdateBagMutation,
  useDeleteBagMutation,
} = bagsApiSlice

// returns the query result object
export const selectBagsResult = bagsApiSlice.endpoints.getBags.select()

// creates memoized selector
const selectBagsData = createSelector(
  selectBagsResult,
  bagsResult => bagsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllBags,
  selectById: selectBagById,
  selectIds: selectBagsIds
  // Pass in a selector that returns the bags slice of state
} = bagsAdapter.getSelectors(state => selectBagsData(state) ?? initialState)
