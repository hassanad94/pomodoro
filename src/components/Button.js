const Button = ({title, activeClass, _callback, role}) => {
  return (
    <button  className={activeClass ? activeClass : ""  } onClick={_callback}> {title} </button>
  )
}

export default Button