import React from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../_metronic/helpers'
import AuthModal from '../components/Auth/Modals/AuthModal'

const LandingPage: React.FC = () => {
  return (
    <div
      className='d-flex flex-column align-items-center  bgi-size-cover bgi-position-center order-1 order-lg-2'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/auth/parking-bg.jpg')})`,
        height: '100vh',
      }}
    >
      <AuthModal />
      <div className='mt-20'>
        <Link to='/'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.svg')} className='h-75px mb-20' />
        </Link>
      </div>

      <div className='text-white fs-4 text-center mt-auto mb-20'>
        Welcome to&nbsp;
        <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
          Poss App,
        </a>
        your ultimate solution for hassle-free parking! <br /> Our application is designed to
        revolutionize your&nbsp;
        <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
          parking experience
        </a>
        <br /> making it seamless, convenient, and efficient.
      </div>
    </div>
  )
}

{
  /* <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      <AuthModal />
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
        style={{backgroundImage: `url(${toAbsoluteUrl('/media/auth/parking-bg.jpg')})`}}
      >
        <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
          <Link to='/' className='mb-12'>
            <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.svg')} className='h-75px mb-20' />
          </Link>

          <Link to='/' className='mb-12'>
              <img alt='Logo' src={toAbsoluteUrl('/media/logos/custom-1.png')} className='h-75px' />
            </Link> 

          <img
            className='mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
            src={toAbsoluteUrl('/media/misc/auth-screens.png')}
            alt=''
          />

          <div className='text-white fs-base text-center'>
            Welcome to&nbsp;
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              Poss App,
            </a>
            your ultimate solution for hassle-free parking! <br /> Our application is designed to
            revolutionize your&nbsp;
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              parking experience
            </a>
            <br /> making it seamless, convenient, and efficient.
          </div>
        </div>
      </div>
    </div>
 */
}

export default LandingPage
