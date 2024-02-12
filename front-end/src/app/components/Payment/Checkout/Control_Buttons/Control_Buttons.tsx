import React, { useState, useEffect } from 'react';
import { ButtonsData } from './ButtonsData';
import { useIntl } from 'react-intl';
import BarrierSection from './BarrierSection/BarrierSection';
import { useDispatch, useSelector } from 'react-redux';
import { print_Receipt } from '../../../../../redux/Shift/Shift_Action';

interface ButtonData {
  title: string;
  img: string;
}

const Control_Buttons: React.FC = () => {
  const [selectedButtons, setSelectedButtons] = useState<boolean[]>(Array(3).fill(false));
  const [omitReceiptStyles, setOmitReceiptStyles] = useState<boolean>(false); // State to control styles for receipt button
  const intl = useIntl();
  const { ink_status } = useSelector((state: any) => state.Websocket_Reducers);
  const dispatch = useDispatch();
  const status = ink_status?.ink_status;

  const handleButtonClick = async (index: number) => {
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[index] = !newSelectedButtons[index];
    setSelectedButtons(newSelectedButtons);

    if (index === 2) {
      dispatch(print_Receipt())
    }
  };

  const dynamicButtonsData: ButtonData[] = ButtonsData(status, selectedButtons);

  useEffect(() => {
    // Reset omitReceiptStyles when selectedButtons changes
    if (omitReceiptStyles) {
      setOmitReceiptStyles(false);
      setSelectedButtons((prevSelectedButtons) => prevSelectedButtons.map((_, i) => i === 2 ? false : prevSelectedButtons[i])); // Reset only the receipt button state
    }
  }, [selectedButtons, omitReceiptStyles]);

  return (
    <>
      <div className='card mb-5 shadow-sm'>
        <div
          className='d-flex flex-equal gap-4 px-4 py-4'
          data-kt-buttons='true'
          data-kt-buttons-target='[data-kt-button]'
        >
          {dynamicButtonsData.map((data, index: number) => (
            <label
              key={index}
              className={`btn btn-color-gray-600 w-100 py-5 ${selectedButtons[index] ? 'clicked' : ''}`}
              style={{
                backgroundColor: (selectedButtons[index] && !omitReceiptStyles) ? '#EEF6FF' : '#F1F1F2',
                border: (selectedButtons[index] && !omitReceiptStyles) ? '2px solid #3E97FF' : '2px solid #D8D8E5', 
                color: (selectedButtons[index] && !omitReceiptStyles) ? '#3E97FF' : 'gray',
                borderRadius: (selectedButtons[index] && !omitReceiptStyles) ? '12px' : '12px',
                ...(index >= 1 && status === 'ink_out' && { backgroundColor: '#FFEBF1', borderRadius: '12px', color: '#D9214E', border: '1px solid red' }),
                cursor: (index >= 1 && status === 'ink_out') ? 'not-allowed' : 'pointer'
              }}
              onClick={() => handleButtonClick(index)}
            >
              <img src={data.img} alt='images' />
              <span className='fw-bold d-block' style={{ fontSize: '16px' }}>
                {intl.formatMessage({ id: data.title })}
              </span>
            </label>
          ))}
        </div>
      </div>
      {selectedButtons[0] && <BarrierSection />}
    </>
  );
};

export default Control_Buttons;