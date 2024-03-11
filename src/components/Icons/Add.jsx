const Add = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={400}
      height={401}
      viewBox="0 0 300 300.75"
      {...props}
    >
      <defs>
        <clipPath id="a">
          <path d="M.125.746h299.75v299.75H.125Zm0 0" />
        </clipPath>
        <clipPath id="b">
          <path d="M150 .746C67.227.746.125 67.848.125 150.621c0 82.774 67.102 149.875 149.875 149.875s149.875-67.101 149.875-149.875C299.875 67.848 232.773.746 150 .746Zm0 0" />
        </clipPath>
        <clipPath id="c">
          <path d="M43.89 44.512h212.075v212.074H43.89Zm0 0" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <g clipPath="url(#b)">
          <path fill="#004aad" d="M.125.746h299.75v299.75H.125Zm0 0" />
        </g>
      </g>
      <g clipPath="url(#c)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M234.875 129.398h-63.746V65.742c0-11.71-9.504-21.222-21.219-21.222-11.71 0-21.222 9.511-21.222 21.222v63.66l-63.57-.004c-11.712 0-21.22 9.508-21.22 21.22 0 11.714 9.508 21.222 21.22 21.222h63.577v63.66c0 11.715 9.504 21.223 21.22 21.223 11.71 0 21.218-9.508 21.218-21.223v-63.66h63.742c11.715 0 21.219-9.508 21.219-21.223 0-11.71-9.504-21.219-21.219-21.219Zm0 0"
        />
      </g>
    </svg>
  )
  export default Add