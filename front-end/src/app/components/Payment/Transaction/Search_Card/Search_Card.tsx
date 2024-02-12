import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useDispatch} from 'react-redux'
import {fetch_Filtered_Transaction_Data} from '../../../../../redux/Transaction/Transaction_Action'
import {useFormik} from 'formik'
import {search_Validation, initialValues} from './Settings'
import Flatpickr from 'react-flatpickr'
import clsx from 'clsx'
import Parking_Table from '../../../Parking_Details/Parking_Table'

const Search_Card: React.FC = () => {
  const dispatch = useDispatch()
  const intl = useIntl()

  const formik = useFormik({
    initialValues,
    validationSchema: search_Validation(),

    onSubmit: (values) => {
      dispatch(fetch_Filtered_Transaction_Data(formik.values))
    },
  })

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates && selectedDates[0] && selectedDates[1]) {
      const startDate = selectedDates[0]
      let endDate = selectedDates[1]

      if (startDate.toDateString() === endDate.toDateString()) {
        startDate.setHours(0, 0, 0, 0)
        endDate = new Date()
      }

      formik.setFieldValue('start_Date', startDate.toISOString())
      formik.setFieldValue('end_Date', endDate.toISOString())
    }
  }

/*   useEffect(() => {
    console.log('Form values:', formik.values)
  }, [formik.values])  */
  return (
    <>
      <div className='card' style={{boxShadow: '0px 0px 10px 0px #0000001A'}}>
        <form className='card-body ' onSubmit={formik.handleSubmit} style={{padding: '2rem 1rem'}}>
          <div className='container '>
            <div className='row '>
              <div className='row col  '>
                <div className='col-auto'>
                  <label className='col-form-label fs-5 fw-bold'>
                    {intl.formatMessage({id: 'INPUT.LICENCEPLATE'})}
                  </label>
                </div>
                <div className='col-7'>
                  <input
                    type='text'
                    className={clsx('form-control bg-transparent', {
                      'is-invalid': formik.touched.licence_plate && formik.errors.licence_plate,
                    })}
                    placeholder='FV...'
                    {...formik.getFieldProps('licence_plate')}
                    onChange={(e) =>
                      formik.setFieldValue('licence_plate', e.target.value.toUpperCase())
                    }
                  />
                </div>
              </div>
              <div className='row col'>
                <div className='col-auto'>
                  <label className='col-form-label fs-5 fw-bold'>
                    {intl.formatMessage({id: 'INPUT.TIMEINTERVAL'})}
                  </label>
                </div>
                <div className='col-8'>
                  <Flatpickr
                    options={{
                      mode: 'range',
                      maxDate: new Date(Date.now()),
                      //dateFormat: 'Y-m-d H:i',
                      enableTime: true,
                      time_24hr: true,
                      //altFormat: 'Y-m-d H:i',
                    }}
                    className={clsx('form-control bg-transparent', {
                      'is-invalid':
                        (formik.touched.start_Date && formik.errors.start_Date) ||
                        (formik.touched.end_Date && formik.errors.end_Date),
                    })}
                    placeholder='Pick date'
                    onChange={handleDateChange}
                  />
                </div>
              </div>
              <div
                className=''
                data-kt-button='true'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_1'
                style={{width: 'auto'}}
              >
                <button type='submit' className='btn btn-primary'>
                  {intl.formatMessage({id: 'SEARCH.BUTTON'})}
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
          <div className='modal-dialog modal-dialog-centered mw-900px'>
            <div className='modal-content'>
              <Parking_Table inputs={formik.values}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search_Card
