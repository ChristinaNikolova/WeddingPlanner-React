import './Home.css';
import Jumbotron from './Jumbotron/Jumbotron';

function Home() {
    return (
        <section id="home" className="section">
            <Jumbotron />
            <div className="home-content-wrapper">
                <h2 className="home-title">ELEGANTLY DESIGNED · ECLECTICALLY CURATED · IMPECCABLY PLANNED</h2>
                <span className="home-content">
                    Because planning the biggest day of your life is only the beginning of your adventure
                </span>
                <a className='btn'>Start planning</a>
            </div>
        </section>
    );
}

export default Home;