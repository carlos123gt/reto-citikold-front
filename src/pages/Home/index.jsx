import Card from '../../components/atom/Card'
import { Product, Client, Receipt } from '../../components/Icons'
import DashboardLayout from '../../layounts/DashboardLayout'
import { Link } from 'react-router-dom'
import { PATHS } from '../../utils/constants'

function Home() {
  return (
    <div>
        <DashboardLayout>
            <h1 className='text-dark text-[2.5rem]'>Sistema de Facturación</h1>
            <div className='grid grid-cols-3 gap-4 pt-10'>
                <div>
                    <Card>
                        <div className='flex justify-between'>
                            <h1 className='text-primary text-3xl'>Productos</h1>
                            <Product width={120} height={120}/>
                        </div>
                        <Link className='cursor-pointer hover:underline' to={PATHS.PRODUCTS}>Ir a Productos</Link>
                    </Card>
                </div>
                <div>
                    <Card>
                        <div className='flex justify-between'>
                            <h1 className='text-primary text-3xl'>Clientes</h1>
                            <Client width={120} height={120}/>
                        </div>
                        <Link className='cursor-pointer hover:underline' to={PATHS.CLIENTS}>Ir a Clientes</Link>
                    </Card>
                </div>
                <div>
                    <Card>
                        <div className='flex justify-between'>
                            <h1 className='text-primary text-3xl'>Facturas</h1>
                            <Receipt width={120} height={120}/>
                        </div>
                        <Link className='cursor-pointer hover:underline' to={PATHS.RECEIPTS}>Ir a Facturas</Link>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
            
    </div>
  )
}

export default Home