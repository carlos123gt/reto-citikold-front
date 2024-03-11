/* eslint-disable react/prop-types */

function Card({children}) {
  return (
    <div className='bg-white rounded-3xl p-8 shadow-sm'>
        {children}
    </div>
  )
}

export default Card