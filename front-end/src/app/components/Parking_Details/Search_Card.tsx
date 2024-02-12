import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import Flatpickr from 'react-flatpickr'
import clsx from 'clsx'
import {fetch_Filtered_Transaction_Data} from '../../../redux/Transaction/Transaction_Action'
import {search_Validation, initialValues} from './Settings'

interface ParkingTableProps {
  inputs: {
    licence_plate: string
    start_Date: Date
    end_Date: Date | null
  }
}
const Search_Card: React.FC<ParkingTableProps> = ({inputs}) => {

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
  useEffect(() => {
    formik.setValues({
      licence_plate: inputs?.licence_plate,
      start_Date: inputs?.start_Date,
      end_Date: null,
    })
  }, [inputs])

  return (
    <>
      <div className='card'>
        <form className='card-body' onSubmit={formik.handleSubmit}>
          <div className='container'>
            <div className='row '>
              <div className='row col  justify-content-center'>
                <div className='col-auto'>
                  <label className='col-form-label'>
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
              <div className='row col justify-content-center'>
                <div className='col-auto'>
                  <label className='col-form-label'>
                    {intl.formatMessage({id: 'INPUT.TIMEINTERVAL'})}
                  </label>
                </div>
                <div className='col-7'>
                  <Flatpickr
                    options={{
                      mode: 'range',

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
              <div className='col-2  d-flex justify-content-end'>
                <button type='submit' className='btn btn-primary'>
                  {intl.formatMessage({id: 'SEARCH.BUTTON'})}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Search_Card
