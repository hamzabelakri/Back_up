import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import Shift_Page from '../pages/Shift_Page'
import Config_Page from '../pages/Config_Page'
import Payment_Page from '../pages/Payment_Page'

const Private_Routes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
      <Route path='auth/*' element={<Navigate to='/payment' />} />
        {/* Pages */}
        <Route path='payment' element={<Payment_Page />} />
        <Route path='config' element={<Config_Page />} />
        <Route path='shift' element={<Shift_Page />} />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {Private_Routes}
