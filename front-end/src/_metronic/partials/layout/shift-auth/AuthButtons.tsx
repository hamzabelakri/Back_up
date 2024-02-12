import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {operator_Logout, operator_Pause_Shift} from '../../../../redux/Auth/Auth_Action'
import toast from 'react-hot-toast'

const AuthButtons = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {operator, connected_operator} = useSelector((state: any) => state.Auth_Reducer)
  const email = operator?.email
  const shift_id = operator?.id
  const {data} = useSelector((state: any) => state.Websocket_Reducers)
  const showToast = () => {
    toast.error('Transaction on hold')
  }

  const handleLogout = () => {
    data.articles_data && Object.keys(data.articles_data).length !== 0
      ? showToast()
      : dispatch(operator_Logout(email, navigate))
  }

  const handlePause = () => {
    const event = 'pause'
    data.articles_data && Object.keys(data.articles_data).length !== 0
      ? showToast()
      : dispatch(operator_Pause_Shift(shift_id, event, navigate))
  }
  return (
    <>
      <div className='app-navbar-item ms-2 ms-lg-6' role='button' onClick={handlePause}>
        <img src='media/buttons//Pause-Shift.svg' />
      </div>
      <div className='app-navbar-item ms-2 ms-lg-6' role='button' onClick={handleLogout}>
        <img src='media/buttons//Close-Shift.svg' />
      </div>
    </>
  )
}

export default AuthButtons
