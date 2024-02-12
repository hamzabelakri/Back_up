import React, {useState, useEffect} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {useDispatch, useSelector} from 'react-redux'
import {lost_Ticket} from '../../../../../../redux/Articles/Articles_Action'

type Props = {
  className: string
  prefix: string
}

const First_Article_Buttons: React.FC<Props> = ({className, prefix}) => {
  const [clickedButton, setClickedButton] = useState<number | null>(null)
  const {article_buttons} = useSelector((state: any) => state.Articles_Reducer)

  const dispatch = useDispatch()

  const handleButtonClick = (index: number) => {
    setClickedButton(index);
    setTimeout(() => setClickedButton(null), 300);
    const clickedButtonTitle = article_buttons[index].title;
    if (clickedButtonTitle === "Lost Ticket") {
      dispatch(lost_Ticket());
    }
  };

  return (
    <div className={`card ${className}`}>
      <div
        className='card-body'
        style={{position: 'relative', margin: '0 20px', padding: '2rem 4rem'}}
      >
        <div
          className={`swiper-button-next ${prefix}-swiper-button-next`}
          style={{
            color: 'black',
            fontWeight: 'bold',
            transform: 'scale(0.4)',
            position: 'absolute',
            right: 0,
            top: '50%',
          }}
        ></div>
        <div
          className={`swiper-button-prev ${prefix}-swiper-button-prev`}
          style={{
            color: 'black',
            fontWeight: 'bold',
            transform: 'scale(0.4)',
            position: 'absolute',
            left: 0,
            top: '50%',
          }}
        ></div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={5}
          navigation={{
            nextEl: `.${prefix}-swiper-button-next`,
            prevEl: `.${prefix}-swiper-button-prev`,
          }}
          style={{textAlign: 'center'}}
        >
          {article_buttons.length > 0 &&
            article_buttons.map((button, index) => (
              <SwiperSlide key={`${prefix}-${index}`}>
                <button
                  className={`btn btn-outline btn-flex flex-column pt-9 pb-7 page-bg show rounded-4`}
                  style={{
                    width: 148,
                    height: 150,
                    border:
                      clickedButton === index ? '3.45px solid #3E97FF' : '1.58px solid #D8D8E5',
                  }}
                  onClick={() => handleButtonClick(index)}
                >
                  <div className='mb-3'>
                    <img src={button.img} className='w-50px' alt='' />
                  </div>
                  <div className=''>
                    <span
                      className=' fw-bold d-block pt-1'
                      style={{fontSize: '18px', lineHeight: '22px'}}
                    >
                      {button.title}
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

export default First_Article_Buttons
