import { isRejectedWithValue } from '@reduxjs/toolkit'

export const rtkErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log(action)
  }
  return next(action)
}
