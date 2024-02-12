import React from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../_metronic/layout/core'
import Shift from '../components/Shift/Shift'

const Shift_Page: React.FC = () => {
  const intl = useIntl()

  return (
    <>
    {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SHIFT'})}</PageTitle> */}
    <Shift />
  </>
  )
}

export default Shift_Page
