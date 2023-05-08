import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isForbiddenError } from './utils/type-predicate'
import { setCurrentToken } from './features/auth/auth.slice'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.currentToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  // console.log(result)
  const error = result?.error
  if (error && isForbiddenError(error)) {
    const refreshResult = await baseQuery('user/refresh-token', api, extraOptions)
    if (refreshResult.data && 'accessToken' in refreshResult.data) {
      api.dispatch(setCurrentToken(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories', 'Products', 'Cart', 'FETCH_ERROR', 'UNKNOWN_ERROR'],

  endpoints: () => ({})
})
