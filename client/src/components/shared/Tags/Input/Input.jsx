function Input({ name, type, label, value, onChangeHandler, onBlurHandler }) {
    return (
        <>
            <label className="label" htmlFor={name}>{label}</label>
            <input className="input"
                id={name}
                name={name}
                type={type}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                value={value}
            />
        </>
    );
}

export default Input;