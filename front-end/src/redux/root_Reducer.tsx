import {combineReducers} from 'redux'
import Websocket_Reducers from './WebSocket/Websocket_Reducers'
import Config_Reducer from './Config/Config_Reducer'
import Transaction_Reducers from './Transaction/Transaction_Reducers'
import Auth_Reducer from './Auth/Auth_Reducer'
import Shift_Reducers from './Shift/Shift_Reducers'
import Articles_Reducer from './Articles/Articles_Reducer'
import Report_Reducer from './Report/Report_Reducer'

const root_Reducer = combineReducers({
  Config_Reducer: Config_Reducer,
  Websocket_Reducers: Websocket_Reducers,
  Transaction_Reducers:Transaction_Reducers,
  Shift_Reducers:Shift_Reducers,
  Auth_Reducer:Auth_Reducer,
  Articles_Reducer:Articles_Reducer,
  Report_Reducer:Report_Reducer
})

export default root_Reducer
