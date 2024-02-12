import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {Container} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {Toaster} from 'react-hot-toast'
import {initialValues, serverFormSchema} from '../components/Types'
import {get_All_Data, get_One_Server, post_All_Data} from '../../redux/Config/Config_Action'
import {useNavigate} from 'react-router-dom'
import {admin_Logout, operator_Logout} from '../../redux/Auth/Auth_Action'

const Config_Page: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {data} = useSelector((state: any) => state.Config_Reducer)
  const {oneServerData} = useSelector((state: any) => state.Config_Reducer)
  //console.log(oneServerData)
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: serverFormSchema(intl),

    onSubmit: (values, setSubmitting) => {
      setLoading(true)

      formik.setErrors({port: ''})
      formik.setTouched({port: false})
      dispatch(post_All_Data(formik.values))
    },
  })

  const handleClick = (event) => {
    dispatch(get_One_Server({ip: formik.values.ip, port: formik.values.port}))
    event.preventDefault()
  }

  const handleDiscard = () => {
    dispatch(admin_Logout(navigate))
  }

  useEffect(() => {
    dispatch(get_All_Data())
  }, [dispatch])

  useEffect(() => {
    if (data) {
      formik.setFieldValue('ip', data.serverip || '')
      formik.setFieldValue('port', data.serverport || '')
      const selectedZR = data.lrgeometry?.find((zr) => zr.selected)?.name ?? ''
      // formik.setFieldValue('selectedZR', selectedZR)
      //console.log(selectedZR)
    }
  }, [data])

  return (
    <Container className='w-900px'>
      <div className='card mb-5 mb-xl-10'>
        <Toaster position='top-center' reverseOrder={false} />
        <div
          className='card-header border-0'
          role=''
          data-bs-toggle=''
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'CONFIG.CONFIGURATION'})}</h3>
          </div>
        </div>

        {/* // ---------------------- Connect Server ------------------------------------ // */}

        <div id='kt_account_profile_details' className='collapse show'>
          <form onSubmit={formik.handleSubmit} noValidate className='form px-15'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  {' '}
                  {intl.formatMessage({id: 'CONFIG.SERVER_SETTING'})}
                </label>

                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-5 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg  mb-3 mb-lg-0'
                        placeholder={intl.formatMessage({id: 'CONFIG.ZRIP'})}
                        {...formik.getFieldProps('ip')}
                      />
                      {formik.touched.ip && formik.errors.ip && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.ip}</div>
                        </div>
                      )}
                    </div>

                    <div className='col-lg-4 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg '
                        placeholder={intl.formatMessage({id: 'CONFIG.PORT'})}
                        {...formik.getFieldProps('port')}
                      />
                      {formik.touched.port && formik.errors.port && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.port}</div>
                        </div>
                      )}
                    </div>
                    <div className='col-lg-3 fv-row'>
                      <button className='btn btn-primary' onClick={handleClick}>
                        {intl.formatMessage({id: 'CONFIG.CONNECT'})}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* // ---------------------- DropDownBoxes ------------------------------------ // */}

              <div className='row mb-6 '>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'CONFIG.SERVER_SELECT'})}
                </label>

                <div className='col-lg-6 fv-row'>
                  <select
                    className='form-select  form-select-lg'
                    {...formik.getFieldProps('selectedZR')}
                  >
                    <option value=''>{intl.formatMessage({id: 'CONFIG.ZR_OPTION'})}</option>
                    {oneServerData &&
                      oneServerData.map((item) => (
                        <option key={item.id} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  {formik.touched.selectedZR && formik.errors.selectedZR && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.selectedZR}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'CONFIG.POS_SELECT'})}
                </label>

                <div className='col-lg-6 fv-row'>
                  <select
                    className='form-select  form-select-lg'
                    {...formik.getFieldProps('selectedPos')}
                  >
                    <option value=''>{intl.formatMessage({id: 'CONFIG.POS_OPTION'})}</option>
                    {oneServerData &&
                      oneServerData
                        .find((item) => item.name === formik.values.selectedZR)
                        ?.pos.map((pos) => (
                          <option key={pos.id} value={pos.value}>
                            {pos.name}
                          </option>
                        ))}
                  </select>{' '}
                  {formik.touched.selectedPos && formik.errors.selectedPos && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.selectedPos}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* // ---------------------- Submit Button ------------------------------------ // */}

            <div className='card-footer d-flex justify-content-center py-6 px-9'>
              <button
                className='btn btn-light btn-active-light-primary me-2'
                onClick={handleDiscard}
              >
                {intl.formatMessage({id: 'CONFIG.DISCARD'})}
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                // disabled={loading || !formik.isValid}
              >
                {!loading ? (
                  intl.formatMessage({id: 'CONFIG.SAVE_CHANGES'})
                ) : (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    {intl.formatMessage({id: 'AUTH.LOGIN.WAIT'})}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default Config_Page
