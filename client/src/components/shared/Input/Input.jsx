import styles from './Input.module.css';

function Input({ name, type, label, value, onChangeHandler, onBlurHandler }) {
    return (
        <>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <input className={styles.input}
                id={name}
                name={name}
                type={type}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                value={value}
            />
        </>
    )
}

export default Input;