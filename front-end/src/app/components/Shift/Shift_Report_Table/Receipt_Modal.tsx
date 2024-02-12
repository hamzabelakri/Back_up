import React from 'react'
import {useDispatch} from 'react-redux'
import {print_Receipt} from '../../../../redux/Report/Report_Action'
import {Toaster} from 'react-hot-toast'

interface ReceiptModalProps {
  item: any
}
const Receipt_Modal: React.FC<ReceiptModalProps> = ({item}) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(print_Receipt(item))
  }

  return (
    <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
      <Toaster position='top-center' />
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h3 className='modal-title'>Receipt Details</h3>
            <div
              className='btn btn-icon btn-sm btn-active-light-primary ms-2'
              data-bs-dismiss='modal'
              aria-label='Close'
            >
              <i className='ki-duotone ki-cross fs-1'>
                <span className='path1' />
                <span className='path2' />
              </i>
            </div>
          </div>
          <div className='modal-body' style={{fontSize: '14px'}}>
            <p>Article ID: {item?.ArticleID}</p>
            <p>LPN: {item?.lpn}</p>
            <p>Price: ${item?.price}</p>
            <p>Carte Type: {item?.carteType}</p>
            <p>Duration: {item?.duration}</p>
          </div>
          <div className='modal-footer'>
            
            <button type='button' className='btn btn-primary' onClick={handleClick}>
              Print
            </button>
            <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receipt_Modal
