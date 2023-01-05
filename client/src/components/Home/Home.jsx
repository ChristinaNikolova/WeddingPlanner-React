import { Link } from 'react-router-dom';

import * as constants from '../../utils/constants/images';

import LastThreeArticles from '../shared/Blog/LastThreeArticles/LastThreeArticles';
import Jumbotron from '../shared/Jumbotron/Jumbotron';

import styles from './Home.module.css';

function Home() {
    return (
        <section className={styles.home}>
            <Jumbotron
                pathToImage={constants.jumbo.HOME}
                isHomePage={true}
            />
            <div className={styles["home-content-wrapper"]}>
                <h2 className={styles["home-title"]}>ELEGANTLY DESIGNED · ECLECTICALLY CURATED · IMPECCABLY PLANNED</h2>
                <p className={styles["home-content"]}>
                    Because planning the biggest day of your life is only the beginning of your adventure
                </p>
                <Link to="/plan" className='btn'>Start planning</Link>
            </div>
            <LastThreeArticles />
        </section>
    );
}

export default Home;