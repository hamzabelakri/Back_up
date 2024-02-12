import axios from 'axios'
import {FETCH_ALL_ARTICLE_BUTTONS, LOST_TICKET} from './Types'

const url = 'http://127.0.0.1:8000/'

export const fetch_All_Article_Buttons: any = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}get_buttons_data`)
    dispatch({type: FETCH_ALL_ARTICLE_BUTTONS, payload: response.data})
    console.log('all buttons', response.data)
  } catch (error) {
    console.log(error)
  }
}
export const lost_Ticket: any = () => async (dispatch) => {
  try {
    
    dispatch({type: LOST_TICKET})
  } catch (error: any) {
  }
}

