import Jumbotron from "../../shared/Jumbotron/Jumbotron";


function ArticlesList({ pathToImage }) {
    return (
        <section className="section">
            <Jumbotron pathToImage={pathToImage} />
            <div>
                test
            </div>
        </section>
    );
}

export default ArticlesList;