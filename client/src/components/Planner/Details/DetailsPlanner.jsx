import styles from './DetailsPlanner.module.css';

function DetailsPlanner() {
    return (
        <section className="details-planner section-background">
            <span style={{ width: '200px', height: '600px' }}><img src="/img/Bride-PNG-Image-30858.png" alt="bride" style={{ width: '200px', height: '100%' }} /></span>
            <span style={{ width: '200px', height: '600px' }}><img src="/img/Groom-PNG-Image-95770.png" alt="groom" style={{ width: '200px', height: '100%', objectFit: 'cover' }} /></span>


        </section>
    );
}

export default DetailsPlanner;