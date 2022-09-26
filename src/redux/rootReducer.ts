import { combineReducers  } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterSlice';

const rootReducer = combineReducers({
    counter: counterReducer
})

export default rootReducer;