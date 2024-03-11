/* eslint-disable react/prop-types */

function Table({children}) {
  return (
    <table className='border-collapse border-spacing-4 w-full text-dark'>
        {children}
    </table>
  )
}

export default Table