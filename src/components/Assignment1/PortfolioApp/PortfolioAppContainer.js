import PortfolioData from "../Database/PortfolioData";
import "./PortfolioContainer.css";

function PortfolioAppContainer() {
    return (
        <div className="portfolio-container">
            {PortfolioData.map((data, index) => (
                <div className="portfolio-card">
                    <div className="header" key={data.id}>
                        <img src={data.portfolioImage} alt={data.name} className="profile-image" />
                        <div className="profile-info">
                            <h1 className="name">{data.name}</h1>
                            <h1 className="title">{data.title}</h1>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );

}


export default PortfolioAppContainer