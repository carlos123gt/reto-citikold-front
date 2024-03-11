/* eslint-disable react/prop-types */

function Button({children, typeButton, variant = 'primary'}) {
  return (
    <button
        type={typeButton}
        className={`flex w-full justify-center hover:opacity-90 rounded-full px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variant == 'primary' && 'bg-primary' || variant == 'danger' && 'bg-red-600' || 'bg-blue-500'}`}
        >
        {children}
    </button>
  )
}

export default Button