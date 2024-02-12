import React from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

type Props = {
  className: string
  data
  onEmailClick: (email: string) => void
}
const UserSession: React.FC<Props> = ({className, data, onEmailClick}) => {
  return (
    <div className={`card ${className}`}>
      <div className='card-body '>
        <div className='scroll-container mh-150px overflow-auto '>
          {data.map((elt) => (
            <div key={elt.id} className='d-flex align-items-center mb-3'>
              <div className='symbol symbol-50px me-5'>
                <img src={toAbsoluteUrl('/media/avatars/300-5.jpg')} alt='' />
              </div>
              <div className='flex-grow-1'>
                <a
                  href='#'
                  className='text-dark fw-bold text-hover-primary fs-6'
                  onClick={() => onEmailClick(elt.email)}
                >
                  {elt.email}
                </a>
                <span className='text-muted d-block fw-semibold'>Project Manager</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserSession
