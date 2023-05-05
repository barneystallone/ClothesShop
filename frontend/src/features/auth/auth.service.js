import { api } from '../../apiSlice'

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => {
        return {
          url: 'user/login',
          method: 'POST',
          body: { ...user }
        }
      }
    }),
    register: builder.mutation({
      query: (user) => {
        return {
          url: 'user/register',
          method: 'POST',
          body: user
        }
      }
    }),
    refresh: builder.query({
      query: () => {
        return {
          url: 'user/refresh'
        }
      }
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyRefreshQuery,
  useRefreshQuery
} = authApi
