import { createSlice } from '@reduxjs/toolkit'
import { ConnectionStatus } from 'types'

const connectionSlice = createSlice({
    name: 'connectStatus',
    initialState: ConnectionStatus.DISCONNECTED,
    reducers: {
      setConnectStatus(state, action) {
        return action.payload
      }
    }
  })
  
  export const { setConnectStatus } = connectionSlice.actions
  
  export default connectionSlice.reducer