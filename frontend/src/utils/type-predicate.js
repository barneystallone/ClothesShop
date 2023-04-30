export const isFetchBaseQueryError = (error) => {
  return typeof error === 'object' && error !== null && error.status && !error.message
}
export const isPayloadError = (payload) => {
  return (
    isFetchBaseQueryError(payload) &&
    payload?.data &&
    payload.data?.message &&
    typeof payload.data.message === 'string'
  )
}
export const isNotFoundError = (payload) => {
  return isPayloadError(payload) && payload.status === 404
}
export const isConflictError = (payload) => {
  return isPayloadError(payload) && payload.status === 409
}

export const isForbiddenError = (payload) => {
  return isPayloadError(payload) && payload.status === 403
}
