import DashboardLayout from '../../layounts/DashboardLayout';
import ListFacturas from './listFacturas';
function Facturas() {
  return (
    <DashboardLayout>
        <h1 className='text-dark text-[2.5rem]'>Facturas</h1>
        <ListFacturas/>
    </DashboardLayout>
  )
}

export default Facturas