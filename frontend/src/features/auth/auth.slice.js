import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showModalStatus: false,
  currentUser: null, // {userId, userEmail}
  currentToken: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentToken: (state, action) => {
      state.currentToken = action.payload.accessToken
    },
    setShowModalStatus: (state, action) => {
      state.showModalStatus = action.payload
    },
    setCredentials: (state, action) => {
      const { accessToken, ...user } = action.payload
      state.currentUser = user
      state.currentToken = accessToken
    },
    logOut: (state) => {
      state.currentToken = null
      state.currentUser = null
    },
    reset: () => initialState
  }
})

export default authSlice.reducer
export const { setCurrentToken, setShowModalStatus, reset, setCredentials, logOut } =
  authSlice.actions

export const selectCurrentToken = (state) => state.auth.currentToken
export const selectCurrentUser = (state) => state.auth.currentUser
export const selectShowModalStatus = (state) => state.auth.showModalStatus
