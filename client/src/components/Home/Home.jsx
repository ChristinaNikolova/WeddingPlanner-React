import Jumbotron from './Jumbotron/Jumbotron';
import styles from './Home.module.css';

function Home() {
    return (
        <section className={`${styles.home} section`}>
            <Jumbotron />
            <div className={styles["home-content-wrapper"]}>
                <h2 className={styles["home-title"]}>ELEGANTLY DESIGNED · ECLECTICALLY CURATED · IMPECCABLY PLANNED</h2>
                <p className={styles["home-content"]}>
                    Because planning the biggest day of your life is only the beginning of your adventure
                </p>
                <a href="/" className='btn'>Start planning</a>
            </div>
        </section>
    );
}

export default Home;