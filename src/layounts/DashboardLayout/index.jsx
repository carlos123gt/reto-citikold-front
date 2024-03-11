/* eslint-disable react/prop-types */
import SideBarMenu from '../../components/root/SIdeBarMenu'

function DashboardLayout({children}) {
  return (
    <>
    <div className='grid grid-cols-12'>
        <div className='col-span-2'>
            <SideBarMenu/>
        </div>
        <div className='col-span-10 p-16'>
            {children}
        </div>
    </div>
    </>
  )
}

export default DashboardLayout