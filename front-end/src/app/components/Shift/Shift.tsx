import {useDispatch, useSelector} from 'react-redux'
import Card from './Shift_Card/Card'
import {useEffect} from 'react'
import {fetch_All_Reports} from '../../../redux/Report/Report_Action'
import Shift_Report_Table from './Shift_Report_Table/Shift_Report_Table'

const Shift: React.FC = () => {
  const dispatch = useDispatch()
  const {reports, isLoading} = useSelector((state: any) => state.Report_Reducer)

  useEffect(() => {
    dispatch(fetch_All_Reports())
  }, [])
  return (
    <>
      <div className='card'>
        <Card reports={reports} isLoading={isLoading}/>
      </div>

      <div className='card mt-6'>
        <Shift_Report_Table reports={reports} isLoading={isLoading}/>
      </div>
    </>
  )
}

export default Shift
