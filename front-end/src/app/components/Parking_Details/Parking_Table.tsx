import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clear_Filtered_Transaction_Data } from '../../../redux/Transaction/Transaction_Action'
import Search_Card from './Search_Card'
interface ParkingTableProps {
  inputs: {
    licence_plate: string
    start_Date: Date
    end_Date: Date | null
  }
}
const Parking_Table: React.FC<ParkingTableProps> = ({ inputs }) => {
  const { filtered_data } = useSelector((state: any) => state.Transaction_Reducers)
  const dispatch = useDispatch()

  //console.log('car_table', filtered_data)

  const handleCloseModal = () => {
    dispatch(clear_Filtered_Transaction_Data())
  }
  return (
    <div className='card'>
      <div className='modal-header'>
        <h2>Search LPN</h2>
        <div
          className='btn btn-sm btn-icon btn-active-color-primary'
          data-bs-dismiss='modal'
          onClick={handleCloseModal}
        >
          <i className='ki-duotone ki-cross fs-1'>
            <span className='path1' />
            <span className='path2' />
          </i>
        </div>
      </div>
      <div id='kt_referred_users_tab_content' className='tab-content'>
        <div
          id='kt_referrals_1'
          className='card-body p-0 tab-pane fade show active'
          role='tabpanel'
        >
          <div className=''>
            <table className='table table-hover align-middle table-row-bordered table-row-solid gy-4 gs-9 mb-0' >
              <thead className='border-gray-200 fs-5 fw-semibold bg-lighten'>
                <tr className='text-gray-700' style={{ fontSize: '14px' }}>
                  <th className='min-w-125px '>Image</th>
                  <th className='min-w-125px '>EPAN</th>
                  <th className='min-w-125px '>Licence_Plate</th>
                  <th className='min-w-125px'>Card_Type</th>
                  <th className='min-w-125px'>Entry_Unit</th>
                  <th className='min-w-125px'>Entry_Time</th>
                </tr>
              </thead>

              <tbody className='fs-6 fw-semibold text-gray-600 '>
                {filtered_data && filtered_data.length > 0 ? (
                  filtered_data.map((item, index) => (
                    <tr key={index} className='' role='button'>
                      <td className='symbol symbol-70px w-100 ps-9'>
                        <img
                          src={item?.image}
                          alt=''
                          className='w-100 hover-scale object-fit-contain'
                        />
                      </td>
                      <td>{item?.epan}</td>
                      <td>{item?.licence_plate}</td>
                      <td>{item?.card_type}</td>
                      <td>{item?.entry_unit}</td>
                      <td className='text-success'>{item?.entry_time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className='text-center pb-2 pt-2 mt-2 mb-2' >
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Search_Card inputs={inputs} />
    </div>
  )
}

export default Parking_Table