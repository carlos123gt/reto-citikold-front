import DashboardLayout from '../../layounts/DashboardLayout'
import ListProducts from './ListProducts'

function Productos() {
  return (
    <div>
        <DashboardLayout>
            <h1 className='text-dark text-[2.5rem]'>Productos</h1>
            <ListProducts/>
        </DashboardLayout>
    </div>
  )
}

export default Productos