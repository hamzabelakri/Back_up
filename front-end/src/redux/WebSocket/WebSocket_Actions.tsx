// src/Redux/WebSocket/WebSocket_Actions.tsx
import {GET_ALL_DATA, CLEAR_ALL_DATA} from './Types'
import toast from 'react-hot-toast'

export const open_Web_Socket: any = () => async (dispatch) => {
  const url = 'ws://127.0.0.1:8000/ws'
  let ws = new WebSocket(url)

  ws.onopen = () => {
    //console.log('WebSocket connection opened')
  }

  ws.onmessage = (event) => {
    const data = event.data
    const parsed_data = JSON.parse(data)
    //console.log('from actions', parsed_data)
    dispatch({type: GET_ALL_DATA, payload: parsed_data})
  }

  ws.onclose = (event) => {
    //console.log('WebSocket connection closed:', event.reason)
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          handleReconnect(resolve, reject)
        }, 5000)
      }),
      {
        loading: 'WebSocket connection lost. Reconnecting...',
        success: 'WebSocket connection restored',
        error: 'Failed to reconnect to WebSocket',
      }
    )
  }

  const handleReconnect = (resolve, reject) => {
    ws = new WebSocket(url)
    ws.onopen = () => {
      console.log('WebSocket reconnection successful')

      resolve()
    }
    ws.onclose = (event) => {
      console.log('WebSocket reconnection failed:', event.reason)

      reject()
    }
    dispatch(open_Web_Socket())
  }

  return () => {
    ws.close()
  }
}

export const clear_All_Data: any = () => (dispatch) => {
  dispatch({type: CLEAR_ALL_DATA})
}
