interface OrdersThisMonthCardProps {
  title: string
  price: number
}

const Orders_This_Month_Card: React.FC<OrdersThisMonthCardProps> = ({
  title,
  price,
}) => {
  return (
    <div className="col">
      <div className='card card-flush '>
        <div className='card-header pt-5'>
          <div className='card-title d-flex flex-column'>
            <div className='d-flex align-items-center'>
              <span className='fs-4 fw-semibold text-gray-400 me-1 align-self-start'>kwd</span>
              <span className='fs-2hx fw-bold  me-2 lh-1 ls-n2 text-success'>{price}</span>
            </div>
            <span className='text-dark pt-1 fw-semibold fs-2 mt-3 '>{title}</span>
          </div>
        </div>
      </div>   
    </div>
  )
}

export default Orders_This_Month_Card