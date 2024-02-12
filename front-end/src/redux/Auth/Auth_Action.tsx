import axios from 'axios'
import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  OPERATOR_LOGIN,
  OPERATOR_LOGOUT,
  OPERATOR_PAUSE,
  OPERATOR_RESUME,
} from './Types'
import toast from 'react-hot-toast'

const url = 'http://127.0.0.1:8000/auth'

export const admin_Login: any = (credentials, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/admin/sign-in`, credentials)
    //console.log("from action",response.data)
    dispatch({type: ADMIN_LOGIN, payload: response.data})
    navigate('/config')
    toast.success('welcome')
  } catch (error: any) {
    toast.error(error.response.data.detail)
  }
}

export const admin_Logout: any = (navigate) => async (dispatch) => {
  dispatch({type: ADMIN_LOGOUT})
  navigate('/auth')
}

export const operator_Login: any = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/operator/sign-in`, credentials)
    dispatch({type: OPERATOR_LOGIN, payload: response.data})
    //console.log("from action",response.data)
    toast.success('welcome')
  } catch (error: any) {
    toast.error(error.response.data.detail)
  }
}

export const operator_Logout: any = (email, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/operator/sign-out`, {email: email})
    dispatch({type: OPERATOR_LOGOUT, payload: response.data})
    // console.log("logout",response.data)
    navigate('/auth')
  } catch (error) {
    console.log(error)
  }
}

export const operator_Pause_Shift: any = (shift_id, pause_body, navigate) => async (dispatch) => {
  try {
    const response = await axios.put(`${url}/operator/pause-shift/${shift_id}`, {pause: pause_body})
    //console.log("paused",response.data)
    dispatch({type: OPERATOR_PAUSE, payload: response.data})
    navigate('/auth')
  } catch (error: any) {
    toast.error(error.response.data.detail)
  }
}

export const operator_Resume_Shift: any = (email) => async (dispatch) => {
  try {
    const response = await axios.put(`${url}/operator/resume-shift`, {email: email})
    //console.log("resumed",response.data)
    dispatch({type: OPERATOR_RESUME, payload: response.data})
  } catch (error: any) {
    toast.error(error.response.data.detail)
  }
}
