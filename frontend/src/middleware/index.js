import { isRejectedWithValue } from '@reduxjs/toolkit'
import { isNotFoundError } from '../utils/type-predicate'
import { toast } from 'react-toastify'

export const rtkErrorLogger = (api) => (next) => (action) => {
  // console.log('api', api.getState())
  if (isRejectedWithValue(action)) {
    if (isNotFoundError(action.payload)) {
      console.log(action.payload)
      toast.error(action.payload.data.message)
    }
  }
  return next(action)
}
