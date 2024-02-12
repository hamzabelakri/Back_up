import React, {FC} from 'react'
import {MixedWidget1, MixedWidget7, MixedWidget8} from '../../../../_metronic/partials/widgets'

const Mixed: FC = () => {
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <MixedWidget1 className='card-xl-stretch mb-xl-8' color='primary' />
        </div>
        <div className='col-xl-4'>
          <MixedWidget7
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
          />
        </div>
        <div className='col-xl-4'>
          <MixedWidget8
            className='card-xl-stretch mb-xl-8'
            chartColor='success'
            chartHeight='150px'
          />
        </div>
      </div>
    </>
  )
}

export {Mixed}
