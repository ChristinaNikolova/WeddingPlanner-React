import styles from './SingleNote.module.css';

function SingleNote({ id, description, createdAt }) {
    return (
        <div className={styles["notes-all-info-wrapper"]}>
            <div className={styles["notes-all-info-left"]}>
                <p className={styles["notes-all-info"]}>
                    {createdAt}
                </p>
            </div>
            <div className="notes-all-info-right">
                <p className={styles["notes-all-description"]}>
                    {description}
                </p>
            </div>
        </div>
    );
}

export default SingleNote;