import { Link } from 'react-router-dom';

import * as constants from '../../utils/constants/paths';

import Jumbotron from '../shared/Jumbotron/Jumbotron';

import styles from './Home.module.css';

function Home() {
    return (
        <section className={`${styles.home} section`}>
            <Jumbotron pathToImage={constants.paths.JUMBO_HOME} />
            <div className={styles["home-content-wrapper"]}>
                <h2 className={styles["home-title"]}>ELEGANTLY DESIGNED · ECLECTICALLY CURATED · IMPECCABLY PLANNED</h2>
                <p className={styles["home-content"]}>
                    Because planning the biggest day of your life is only the beginning of your adventure
                </p>
                <Link to="/" className='btn'>Start planning</Link>
            </div>
        </section>
    );
}

export default Home;