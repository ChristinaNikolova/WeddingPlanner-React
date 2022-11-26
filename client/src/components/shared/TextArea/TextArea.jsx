function TextArea({ name, label, value, cols, rows, onChangeHandler, onBlurHandler }) {
    return (
        <>
            <label className="label" htmlFor={name}>{label}</label>
            <textarea className="input"
                id={name}
                name={name}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                cols={cols}
                rows={rows}
                value={value}
            />
        </>
    )
}

export default TextArea;