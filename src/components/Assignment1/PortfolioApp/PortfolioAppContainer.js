import PortfolioData from "../Database/PortfolioData";
import "./PortfolioContainer.css";
import Bio from "./Bio";
import Skills from "./Skills";
import Like from "./Like";


function PortfolioAppContainer({theme}) {
    function PortfolioCard({ data }) {
        return (
            <div className="portfolio-card">
                <div className="header" key={data.id}>
                    <img src={data.portfolioImage} alt={data.name} className="profile-image" />
                    <div className="profile-info">
                        <h1 className="name">{data.name}</h1>
                        <h1 className="title">{data.title}</h1>
                    </div>
                </div>
                <Bio bio={data.bio} />
                <Skills skills={data.skills} /> 
                <Like />
            </div>
        )
    }


    return (
        <div className={`portfolio-container ${theme}`}>
            {PortfolioData.map((data, index) => (
                <>
                    <PortfolioCard data={data} key={data.id} />
                </>
            ))}

        </div>
    );

}


export default PortfolioAppContainer
