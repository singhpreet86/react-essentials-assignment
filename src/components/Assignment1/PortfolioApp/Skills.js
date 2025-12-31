   function Skills({skills}) {
        return  (
            <div className="skills-section">
                <span className="skills-label">Skills:</span>
                {skills.map((skill, index) => 
                    <span key={index} className="skill-item">{skill}</span>
                )
                }
            </div>
        )
    }

    export default Skills;
