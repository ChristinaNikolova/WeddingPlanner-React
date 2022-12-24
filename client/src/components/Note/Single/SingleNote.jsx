import styles from './SingleNote.module.css';

function SingleNote({ id, description, createdAt }) {
    return (
        <div className={styles["notes-all-info-wrapper"]}>
            <div className={styles["notes-all-info-left"]}>
                <p className={styles["notes-all-name"]}>
                    {description}
                </p>
            </div>
            <div className="notes-all-info-right">
                <p className={styles["notes-all-info"]}>
                    <span className={styles["notes-all-info-title"]}>Created:</span>
                    {createdAt}
                </p>
            </div>
        </div>
    );
}

export default SingleNote;