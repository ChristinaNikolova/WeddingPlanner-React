function Input({ name, type, label, value, onChangeHandler, onBlurHandler, checked }) {
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
                checked={checked ? checked : ''}
            />
        </>
    );
}

export default Input;