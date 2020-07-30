import { createSlice } from '@reduxjs/toolkit'

const showMenuSlice = createSlice({
    name: 'showMenu',
    initialState: true,
    reducers: {
      setShowMenu(state, action) {
        return action.payload
      }
    }
  })
  
  export const { setShowMenu } = showMenuSlice.actions
  
  export default showMenuSlice.reducer