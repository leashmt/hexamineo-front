const Button = ({label, onClick, color="bg-purple-custom"}) => {
    const baseStyles = "w-full py-3 text-white font-semibold rounded-lg shadow focus:outline-none";

    return(
        <button className={`${baseStyles} ${color}`} onClick={onClick}>
            {label}
        </button>
    )
}

export default Button