import styles from './ServerError.module.css';

function ServerError({ errors }) {
    return (
        <div className={[styles["server-error-wrapper"], "error-message"].join(' ')}>
            {errors.map((e, i) => <div key={i} className={styles["server-error"]}>{e.msg}</div>)}
        </div>
    );
}

export default ServerError;