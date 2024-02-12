import React, {useState} from 'react'
import {useIntl} from 'react-intl'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Receipt_Modal from './Receipt_Modal'

interface Prop {
  reports: any
  isLoading: boolean
}

const Shift_Report_Table: React.FC<Prop> = ({reports, isLoading}) => {
  const [searchLPN, setSearchLPN] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null); 

  const data = reports[0]?.data || []
  const intl = useIntl()
  const filteredData = data.filter((item) =>
    item.lpn.toLowerCase().includes(searchLPN.toLowerCase())
  )

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
  }
  return (
    <div className='card-body'>
      <div className='card'>
        <div className='card-header card-header-stretch border-bottom border-gray-200 d-flex align-items-center'>
          <div className='col'>
            <div className='card-title'>
              <h3 className='fw-bold m-0'>{intl.formatMessage({id: 'SHIFT.TABLE.TITLE'})}</h3>
            </div>
          </div>
          <div className='col-2'>
            <form className='position-relative' autoComplete='off'>
              <i className='ki-duotone ki-magnifier fs-2 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y'>
                <span className='path1' />
                <span className='path2' />
              </i>
              <input
                className='form-control form-control-solid px-15'
                type='text'
                placeholder='Search by LPN'
                value={searchLPN}
                onChange={(e) => setSearchLPN(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className='tab-content'>
          <div
            id='kt_billing_months'
            className='card-body p-0 tab-pane fade show active'
            role='tabpanel'
            aria-labelledby='kt_billing_months'
          >
            <div className='table-responsive'>
              <table className='table table-row-bordered align-middle gy-4 gs-9'>
                <thead className='border-bottom border-gray-200 fs-6 fw-bold bg-light bg-opacity-75'>
                  <tr>
                    <td className=' min-w-150px'>
                      {intl.formatMessage({id: 'SHIFT.TABLE.HEADER.ARTICLE_ID'})}
                    </td>
                    <td className=' min-w-150px'>LPN</td>
                    <td className=' min-w-150px'>
                      {intl.formatMessage({id: 'SHIFT.TABLE.HEADER.PRICE'})}
                    </td>
                    <td className=' min-w-150px'>
                      {intl.formatMessage({id: 'SHIFT.TABLE.HEADER.CARTE_TYPE'})}
                    </td>
                    <td className=' min-w-100px'>
                      {intl.formatMessage({id: 'SHIFT.TABLE.HEADER.DURATION'})}
                    </td>
                    <td className='min-w-100px'>
                    {intl.formatMessage({id: 'SHIFT.TABLE.HEADER.RECEIPT'})}
                    </td>
                  </tr>
                </thead>
                <tbody className='fw-semibold text-gray-600'>
                  {filteredData.map((item) => (
                    <tr key={item.ArticleID}>
                      <td>{item.ArticleID}</td>
                      <td>{item.lpn}</td>
                      <td className='text-success'>${item.price}</td>
                      <td>{item.carteType}</td>
                      <td>{item.duration}</td>
                      <td>
                        <button
                          className='btn btn-primary'
                          data-bs-toggle='modal'
                          data-bs-target='#kt_modal_1'   
                          onClick={() => handleSelectItem(item)}                      
                        >
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Receipt_Modal item={selectedItem}/>
    </div>
  )
}

export default Shift_Report_Table
