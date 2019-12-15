import { combineReducers } from 'redux';
import connectionReducer from '../Game/gameCanvas/managers/connectionManager/connectionSlice';
import nameReducer from '../Game/menu/nameSlice';
import showMenuReducer from '../Game/menu/showMenuSlice';

export default combineReducers({
  connection: connectionReducer,
  name: nameReducer,
  showMenu: showMenuReducer
})