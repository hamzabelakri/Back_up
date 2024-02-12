import {GET_ALL_DATA, GET_ONE_SERVER, GET_SAVED_DATA, POST_ALL_DATA, SELECT_SERVER} from './Types'

const initState = {data: [], selectedServer: null}
const Server_Reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_DATA:
      return {...state, data: action.payload}
      case GET_ONE_SERVER:
      return {...state, oneServerData: action.payload}
      case GET_SAVED_DATA:
        return {...state, data: action.payload}
      case POST_ALL_DATA:
      return {...state, data: action.payload}
    case SELECT_SERVER:
      return {...state, selectedServer: action.payload}
    default:
      return state
  }
}

export default Server_Reducer
