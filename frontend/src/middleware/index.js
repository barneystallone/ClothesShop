import { isRejectedWithValue } from '@reduxjs/toolkit'
import { isPayloadError } from '../utils/type-predicate'
import { toast } from 'react-toastify'

export const rtkErrorLogger = (api) => (next) => (action) => {
  // console.log('api', api.getState())
  if (isRejectedWithValue(action) && isPayloadError(action.payload)) {
    console.log(action.payload)
    if (action.payload.status === 404 || action.payload.status === 400) {
      toast.error(action.payload.data.message)
    }
  }
  return next(action)
}
