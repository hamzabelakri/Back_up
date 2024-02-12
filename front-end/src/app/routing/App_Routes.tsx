/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {Private_Routes} from './Private_Routes'
import {App} from '../App'
import Landing_Page from '../pages/Landing_Page'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {useSelector} from 'react-redux'

const {PUBLIC_URL} = process.env

const App_Routes: FC = () => {
  const {operator, admin} = useSelector((state: any) => state.Auth_Reducer)
  //console.log("connected_operator:",operator,"connected_admin:",admin)
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />

          {operator ? (
            <>
              <Route path='/*' element={<Private_Routes />} />
              <Route index element={<Navigate to='/payment' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<Landing_Page />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {App_Routes}
