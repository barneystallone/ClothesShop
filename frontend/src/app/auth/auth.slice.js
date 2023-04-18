import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showModalStatus: false,
  currentUser: null // {userId, userEmail, accesstoken}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    setShowModalStatus: (state, action) => {
      state.showModalStatus = action.payload
    },
    reset: () => initialState
  }
})

export default authSlice.reducer
export const { setCurrentUser, setShowModalStatus, reset } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.currentUser
export const selectShowModalStatus = (state) => state.auth.showModalStatus
