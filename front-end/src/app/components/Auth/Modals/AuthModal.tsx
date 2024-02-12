import React, {useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Operator_Login from '../Operator/Operator_Login';
import Admin_Login from '../Admin/Admin_Login';



const AuthModal: React.FC = () => {
  const [show, setShow] = useState(false)
  const [currentComponent, setCurrentComponent] = useState('login');
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const open_Admin_Auth = () => {
    setCurrentComponent('adminAuth');
  };
  useEffect(() => {
    handleShow()
  }, [])
  return (
    <div>
      <Modal centered show={show} backdrop="static" onHide={handleClose} keyboard={false} >
      <Modal.Body>
          {currentComponent === 'login' ? (
            <Operator_Login closeModal={setShow}  open_Admin_Auth={open_Admin_Auth}/>
          ) : (
            <Admin_Login closeModal={setShow} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AuthModal
