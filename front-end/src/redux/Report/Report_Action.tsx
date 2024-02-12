import axios from 'axios'
import toast from 'react-hot-toast'
import {FETCH_ALL_REPORTS, PRINT_RECEIPT} from './Types'

const url = 'http://127.0.0.1:8000/'

export const fetch_All_Reports: any = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}shift_report`)
    dispatch({type: FETCH_ALL_REPORTS, payload: response.data})
    console.log('all reports', response.data)
  } catch (error) {
    console.log(error)
  }
}

export const print_Receipt: any = (item) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}print-from-transaction-details`, item)
    dispatch({type: PRINT_RECEIPT, payload: response.data})
    toast.success(response.data.message); 
  } catch (error) {
    console.log(error)
  }
}
