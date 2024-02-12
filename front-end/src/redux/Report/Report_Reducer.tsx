import {FETCH_ALL_REPORTS, PRINT_RECEIPT} from './Types'

const initState = {reports: [], isLoading: true, receipt: null}

const Report_Reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ALL_REPORTS:
      return {...state, reports: action.payload, isLoading: false}
    case PRINT_RECEIPT:
      return {...state, receipt: action.payload}
    default:
      return state
  }
}

export default Report_Reducer
