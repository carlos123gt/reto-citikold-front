/* eslint-disable react/prop-types */

function Select({name, label, typeInput, placeholder, refEl, value, required = true, children, change = () => {}}) {

    return (
      <div>
          <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
          <select
            required={required}
            defaultValue={value}
            ref={refEl}
            type={typeInput}
            name={name}
            id={name}
            className="block w-full rounded-full border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 outline-none ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-primary sm:text-sm sm:leading-6"
            placeholder={placeholder}
            onChange={(e) => change(e)}
          >
            {children}
        </select>
      </div>
    )
  }
  
  export default Select