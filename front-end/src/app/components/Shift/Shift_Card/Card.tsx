import React, {useEffect, useState} from 'react'
import Orders_This_Month_Card from './Orders_This_Month_Card'

interface Prop {
  reports: any
  isLoading: boolean
}
const Card: React.FC<Prop> = ({reports, isLoading}) => {
  const data: [string, number][] = Object.entries(reports[0]?.header_part || {})

  return (
    <div className='card-body row justify-content-center align-items-center'>
      {isLoading ? (
        <div className='spinner-border text-primary' role='status'></div>
      ) : data.length === 0 ? (
        <p className='text-center'>No Data Found</p>
      ) : (
        data.map(([title, price], index) => (
          <Orders_This_Month_Card key={index} price={price} title={title} />
        ))
      )}
    </div>
  )
}

export default Card
