import * as Yup from 'yup'
import {IntlShape, useIntl} from 'react-intl'

export const serverFormSchema = (intl: IntlShape) => {
  return Yup.object().shape({
    ip: Yup.string().required(intl.formatMessage({id: 'INPUT.IP.VALIDATION.REQUIRED'})),
    port: Yup.number()
      .typeError(intl.formatMessage({id: 'INPUT.PORT.VALIDATION.INVALID'}))
      .required(intl.formatMessage({id: 'INPUT.PORT.VALIDATION.REQUIRED'})),
    selectedZR: Yup.string().required(intl.formatMessage({id: 'INPUT.ZR.VALIDATION.REQUIRED'})),
    selectedPos: Yup.string().required(intl.formatMessage({id: 'INPUT.POS.VALIDATION.REQUIRED'})),
  })
}

export const initialValues = {
  ip: '',
  port: '',
  selectedZR: '',
  selectedPos: '',
}
