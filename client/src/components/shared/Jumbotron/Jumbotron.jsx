import styles from './Jumbotron.module.css';

function Jumbotron({ pathToImage }) {
    return (
        <section className={styles.jumbo} style={{ 'backgroundImage': `url(${pathToImage})` }}>
            <div className={styles["jumbo-title-wrapper"]}>
                <h4 className={styles["jumbo-sub-title"]}>It's time to &hellip;</h4>
                <h1 className={styles["jumbo-main-title"]}>plan your wedding</h1>
            </div>
        </section>
    );
}

export default Jumbotron;