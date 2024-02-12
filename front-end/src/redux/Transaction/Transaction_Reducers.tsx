import {GET_TRANSACTION_DATA, GET_FILTERED_DATA, CLEAR_FILTERED_DATA} from './Types'

const initState = {data: [], filtered_data: [], transaction_data: []}

const Transaction_Reducers = (state = initState, action) => {
  switch (action.type) {
    case GET_TRANSACTION_DATA:
      return {...state, data: action.payload}
    case GET_FILTERED_DATA:
      return {...state, filtered_data: action.payload}
    case CLEAR_FILTERED_DATA:
      return {filtered_data: []}

    default:
      return state
  }
}

export default Transaction_Reducers
