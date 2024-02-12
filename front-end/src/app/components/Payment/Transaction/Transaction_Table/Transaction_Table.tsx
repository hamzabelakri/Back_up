import React from 'react'
import {useIntl} from 'react-intl'
import {useSelector} from 'react-redux'



const Transaction_Table: React.FC = () => {
  const {data} = useSelector((state: any) => state.Websocket_Reducers)
  const {epan, licence_plate, card_type, entry_time, duration_stay} = data?.ticket_data || {}
  const intl = useIntl()

  return (
    <div className='mb-0'>
      <div className='row gx-10'>
        <div className='col-lg-12'>
          <label className='form-label fs-6 fw-bold text-gray-700'>EPAN</label>
          <div className='mb-5'>
            <input type='text' className='form-control' value={epan || ''} readOnly />
          </div>
        </div>
      </div>
      <div className='row gx-10'>
        <div className='col-lg-6'>
          <label className='form-label fs-6 fw-bold text-gray-700'>
            {intl.formatMessage({id: 'INPUT.LICENCEPLATE'})}
          </label>
          <div className='mb-5'>
            <input type='text' className='form-control' value={licence_plate || ''} readOnly />
          </div>
        </div>

        <div className='col-lg-6'>
          <label className='form-label fs-6 fw-bold text-gray-700'>
            {intl.formatMessage({id: 'INPUT.CARDTYPE'})}
          </label>
          <div className='mb-5'>
            <input type='text' className='form-control' value={card_type || ''} readOnly />
          </div>
        </div>
      </div>
      <div className='row gx-10'>
        <div className='col-lg-6'>
          <label className='form-label fs-6 fw-bold text-gray-700'>
            {intl.formatMessage({id: 'INPUT.ENTRYTIME'})}
          </label>
          <div className='mb-5'>
            <input type='text' className='form-control' value={entry_time || ''} readOnly />
          </div>
        </div>

        <div className='col-lg-6'>
          <label className='form-label fs-6 fw-bold text-gray-700'>
            {intl.formatMessage({id: 'INPUT.DURATIONSTAY'})}
          </label>
          <div className='mb-5'>
            <input type='text' className='form-control' value={duration_stay || ''} readOnly />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction_Table
