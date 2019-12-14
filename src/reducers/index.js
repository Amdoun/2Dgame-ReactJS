import { combineReducers } from 'redux';
import connectionReducer from '../Game/gameCanvas/managers/connectionManager/connectionSlice';
import nameReducer from '../Game/menu/nameSlice';

export default combineReducers({
  connection: connectionReducer,
  name: nameReducer
})