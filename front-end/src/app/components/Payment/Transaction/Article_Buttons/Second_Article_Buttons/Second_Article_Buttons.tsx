/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {buttonsData} from './ButtonsData'
import {useIntl} from 'react-intl'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

type Props = {
  className: string
  prefix2: string
}

const Second_Article_Buttons: React.FC<Props> = ({className, prefix2}) => {
  const intl = useIntl()
  return (
    <div className={`card ${className}`}>
      <div className='card-body position-relative' style={{margin: '0 20px', padding: '2rem 4rem'}}>
        <div className={`swiper-button-next ${prefix2}-swiper-button-next`} style={{ color: 'black', fontWeight: 'bold', transform: 'scale(0.4)', position: 'absolute', right: 0, top: '50%' }}></div>
        <div className={`swiper-button-prev ${prefix2}-swiper-button-prev`} style={{ color: 'black', fontWeight: 'bold', transform: 'scale(0.4)', position: 'absolute', left: 0, top: '50%' }}></div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={5}
          className='text-center'
          navigation={{
            nextEl: `.${prefix2}-swiper-button-next`,
            prevEl: `.${prefix2}-swiper-button-prev`,
          }}
          mousewheel={{
            sensitivity: 2,
          }}
        >
          {buttonsData.map((button, index) => (
            <SwiperSlide key={`${prefix2}-${button.id}`}>
              <button
                className={`btn btn-outline btn-flex flex-column flex-stack pt-9 pb-7 page-bg show rounded-4  w-150px h-120px`}
                disabled
              >
                <div className='mb-3'>
                  <img src={button.img} className='w-50px' alt='' />
                </div>
                <div className=''>
                  <span className='text-gray-800 fw-bold fs-4 d-block'>
                    {intl.formatMessage({id: button.title})}
                  </span>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Second_Article_Buttons