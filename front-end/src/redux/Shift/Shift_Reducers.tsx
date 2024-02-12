import {FETCH_ALL_SHIFTS,ADD_TRANSACTION_TO_SHIFT, ADD_EVENT_TO_SHIFT, FETCH_PAUSED_SHIFTS,PRINT_RECEIPT} from './Types'

const initState = {shifts: [], shift_trans:[], shift_event: [], paused_shifts: [], receipt: false, event_added: false, event_removed: false}

const Shift_Reducers = (state = initState, action) => {
  switch (action.type) {
    /* case FETCH_ALL_SHIFTS:
      return {...state, shifts: action.payload} */
    case ADD_TRANSACTION_TO_SHIFT:
      return {...state, shift_trans: action.payload}
    case ADD_EVENT_TO_SHIFT:
      return {...state, shift_event: action.payload, event_added: true}
    case FETCH_PAUSED_SHIFTS:
        return {...state, paused_shifts: action.payload} 
    case PRINT_RECEIPT:
          return {...state, receipt: true} 
    default:
      return state
  }
}

export default Shift_Reducers
