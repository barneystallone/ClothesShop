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
      },

      extraOptions: {
        // credentials
      }
    })
  })
})
