import styles from './ServerError.module.css';

function ServerError({ error }) {
    return (
        <div className={styles["server-error-wrapper"]} >
            <div className={styles["server-error"]}>
                {error}
            </div>
        </div>
    );
}

export default ServerError;