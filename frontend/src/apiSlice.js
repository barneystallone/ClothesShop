import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isForbiddenError } from './utils/type-predicate'

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
  console.log(result)
  const error = result?.error
  if (error && isForbiddenError(error)) {
    console.log('error::', error?.status)
  }
  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories', 'Products'],

  endpoints: () => ({})
})
