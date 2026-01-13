import PortfolioData from "../Database/PortfolioData";
import "./PortfolioContainer.css";
import Bio from "./Bio";
import Skills from "./Skills";
import Like from "./Like";
import { useEffect, useState } from "react";


function PortfolioAppContainer() {

  const [theme, setTheme] = useState("light");
  const [imageIndex, setImageIndex] = useState(0);
      
      const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
      }

    function PortfolioCard({ data }) {

        useEffect(() => {
            const timer = setInterval(() =>{
                setImageIndex(Math.floor(Math.random() * data.portfolioImage.length));
            },5000);

            console.log(imageIndex);

            return () => {
                clearInterval(timer);
            };

        });

        return (
            <div className={`portfolio-card ${theme}`}>                 
                             
                <div className="header" key={data.id}>
                    <img src={data.portfolioImage[imageIndex]} alt={data.name} className="profile-image" />
                    <div className="profile-info">
                        <h1 className="name">{data.name}</h1>
                        <h1 className="title">{data.title}</h1>
                    </div>
                </div>
                <Bio bio={data.bio} />
                <Skills skills={data.skills} theme={theme}/>
                <Like />
            </div>
        )
    }


    return (
        <div className={`portfolio-container ${theme}`}>
                <button onClick={toggleTheme} className='theme-toggle-button'>
                  {theme === "light" ? "🌙 Dark" : " ☀️ Light"}
               </button>  

            {PortfolioData.map((data, index) => (
                <>
                    <PortfolioCard data={data} key={data.id} />
                </>
            ))}

        </div>
    );

}


export default PortfolioAppContainer
