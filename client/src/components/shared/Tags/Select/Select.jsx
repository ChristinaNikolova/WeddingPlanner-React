function Select({ name, label, value, onChangeHandler, onBlurHandler, categories }) {
    return (
        <>
            <label className="label" htmlFor={name}>{label}</label>
            <select id={name} className="input"
                name={name}
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
        </>
    );
}

export default Select;