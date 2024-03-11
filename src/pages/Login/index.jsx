import FormLogin from './FormLogin'

function Login() {
  return (
    <div className='grid grid-cols-12 items-center h-full'>
        <div className='p-6 bg-white col-span-3 col-start-5 h-auto rounded-3xl shadow-sm'>
            <FormLogin/>
        </div>
    </div>
  )
}

export default Login