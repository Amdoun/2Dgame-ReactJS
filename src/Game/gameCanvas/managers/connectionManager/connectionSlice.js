import { createSlice } from '@reduxjs/toolkit'
import { triggerStatus } from './connectionConsts'

const connectionSlice = createSlice({
    name: 'connectStatus',
    initialState: triggerStatus.UNTRIGGERED,
    reducers: {
      setConnectStatus(state, action) {
        return action.payload
      }
    }
  })
  
  export const { setConnectStatus } = connectionSlice.actions
  
  export default connectionSlice.reducer