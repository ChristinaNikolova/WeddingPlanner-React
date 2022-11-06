import styles from './ClientError.module.css';

function ClientError({ error }) {
    return (
        <p className={styles["client-error"]}>{error}</p>
    );
}

export default ClientError;