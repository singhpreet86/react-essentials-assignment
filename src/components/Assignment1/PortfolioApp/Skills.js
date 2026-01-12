   function Skills({skills, theme}) {
        return  (
            <div className={`skills-section ${theme}`}>
                <span className="skills-label">Skills</span>
                <div className="skills-list">
                {skills.map((skill, index) => 
                    <span key={index} className="skill-item">{skill}</span>
                )
                }
                </div>
            </div>
        )
    }

    export default Skills;
