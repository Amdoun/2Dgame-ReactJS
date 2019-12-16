import { createSlice } from '@reduxjs/toolkit'

const nameSlice = createSlice({
    name: 'displayName',
    initialState: 'default',
    reducers: {
      setDisplayName(state, action) {
        return action.payload
      }
    }
  })
  
  export const { setDisplayName } = nameSlice.actions
  
  export default nameSlice.reducer