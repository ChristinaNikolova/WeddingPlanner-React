import styles from './Loading.module.css';

function Loading() {
    return (
        <section className={`${styles["loading"]} section section-background`}>
            <span className={styles["loading-content"]}>
                Loading &hellip;
            </span>
        </section >
    );
}

export default Loading;