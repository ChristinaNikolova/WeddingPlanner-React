function Select({
  name,
  label,
  value,
  onChangeHandler,
  onBlurHandler,
  categories,
}) {
  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        className="input"
        name={name}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      >
        {categories.map((c) => (
          <option key={c.id ? c.id : c} value={c.id ? c.id : c}>
            {c.name ? c.name : c}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
