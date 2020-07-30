import { combineReducers } from 'redux';
import connectionReducer from 'slices/connectionSlice';
import nameReducer from 'slices/nameSlice';
import showMenuReducer from 'slices/showMenuSlice';

const rootReducer = combineReducers({
  connection: connectionReducer,
  name: nameReducer,
  showMenu: showMenuReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;