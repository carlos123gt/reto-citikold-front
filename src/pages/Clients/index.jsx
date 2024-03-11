import DashboardLayout from '../../layounts/DashboardLayout'
import ListClients from './ListClients'

function Clientes() {
  return (
    <DashboardLayout>
        <h1 className='text-dark text-[2.5rem]'>Clientes</h1>
        <ListClients/>
    </DashboardLayout>
  )
}

export default Clientes