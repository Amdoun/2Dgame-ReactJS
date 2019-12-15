import { createSlice } from '@reduxjs/toolkit'
import { connectionStatus } from './connectionConsts'

const connectionSlice = createSlice({
    name: 'connectStatus',
    initialState: connectionStatus.DISCONNECTED,
    reducers: {
      setConnectStatus(state, action) {
        return action.payload
      }
    }
  })
  
  export const { setConnectStatus } = connectionSlice.actions
  
  export default connectionSlice.reducer