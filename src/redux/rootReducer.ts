import { combineReducers  } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterSlice';
import authReducer from './reducers/authSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer
})

export default rootReducer;