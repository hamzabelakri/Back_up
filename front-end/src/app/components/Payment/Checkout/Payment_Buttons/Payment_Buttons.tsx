import React, {useState} from 'react'
import {ButtonsData} from './ButtonsData'
import {useIntl} from 'react-intl'
import {useDispatch, useSelector} from 'react-redux'
import {add_Transaction_To_Shift} from '../../../../../redux/Shift/Shift_Action'


interface ButtonData {
  title: string;
  img: string;
  newImg: string;
}

const Payment_Buttons: React.FC = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const [selectedButton, setSelectedButton] = useState<number | null>(null)
  const {data} = useSelector((state: any) => state.Websocket_Reducers)
  const article=data.articles_data
  const ticket=data.ticket_data
  const {operator} = useSelector((state: any) => state.Auth_Reducer)
  const shift_id = operator.id
  const articles_data = data.articles_data
  const {filtered_data} = useSelector((state: any) => state.Transaction_Reducers)
  const {receipt} = useSelector((state: any) => state.Shift_Reducers)
  //console.log("paymen",receipt)
  const payload = {articles_data, filtered_data}
  //console.log('data', data)

  const shift_transaction = {
    action_time: new Date().toISOString(),
    ticket_price: article?.article_1?.price,
    licence_plate: ticket?.licence_plate,
    epan: ticket?.epan,
    entry_time: ticket?.entry_time,
    duration_stay: ticket?.duration_stay,
    card_type: ticket?.card_type,
    image: null,
    payments: [
      {
        article_id: 'example_article_id',
        amount_paid: article?.transaction_bill?.total,
        payment_type: 'Cash',
        ticket_type: 'Regular',
        print_status: receipt
      },
    ],
  };

 

  const handleButtonClick = (index: number) => {
    setSelectedButton(index)
    dispatch(add_Transaction_To_Shift(shift_transaction, shift_id))
  }

  return (
    <>
      <div className='card shadow-sm'>
        <div
          className='d-flex flex-equal gap-4 px-4 py-4'
          data-kt-buttons='true'
          data-kt-buttons-target='[data-kt-button]'
        >
          {ButtonsData.map((data: ButtonData, index: number) => (
            <label
              key={index}
              className={`btn btn-color-gray-600 btn-active-text-gray-800 w-100 px-4 py-2 ${selectedButton === index ? 'border-2 border-blue-500 btn-outline ' : 'border-1'
                }`}
              style={{
                backgroundColor: selectedButton === index ? '#EEF6FF' : '#F1F1F2',
                color: selectedButton === index ? '#3E97FF' : '',
                border: selectedButton === index ? '1px solid #3E97FF' : '1.58px solid #D8D8E5',
                borderRadius: '6px',
              }}
              
            >
              <input className='btn-check' type='radio' name='method' defaultValue={0} checked={selectedButton === index} onClick={() => handleButtonClick(index)} />
              <img
                src={selectedButton === index ? data.newImg : data.img}
                style={{ width: '32px', height: '32px' }}
              />
              <span className='fs-7 fw-bold d-block'>{intl.formatMessage({ id: data.title })}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

export default Payment_Buttons