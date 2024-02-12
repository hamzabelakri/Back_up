/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../_metronic/layout/core'
import Main_Page from '../components/Payment/Main_Page'
import { useAuth } from '../modules/auth'

const Payment_Page: FC = () => {
  const intl = useIntl()
  const {currentUser} = useAuth()

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.PAYMENT'})}</PageTitle> */}
      <Main_Page />
    </>
  )
}

export default Payment_Page
