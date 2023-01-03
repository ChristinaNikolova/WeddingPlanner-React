import styles from './InfoWrapper.module.css';

function InfoWrapper({ budget, actualCosts }) {
    return (
        <div className={styles["budget-info-wrapper"]}>
            <p className={styles["budget-info-target"]}>
                <span className={styles["budget-info-target-name"]}>Budget:</span>
                <span className={styles["budget-info-actual-unit"]}>$</span>
                {budget}
            </p>
            <p className={styles["budget-info-actual"]}>
                <span className={styles["budget-info-actual-name"]}>Actual total:</span>
                <span className={styles["budget-info-actual-unit"]}>$</span>
                {actualCosts}
            </p>
        </div>
    );
}

export default InfoWrapper;