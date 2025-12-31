   function Skills({skills, theme}) {
        return  (
            <div className={`skills-section ${theme}`}>
                <span className="skills-label">Skills:</span>
                {skills.map((skill, index) => 
                    <span key={index} className="skill-item">{skill}</span>
                )
                }
            </div>
        )
    }

    export default Skills;
