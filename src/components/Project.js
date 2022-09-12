import React, {useState, useEffect} from "react";
import sanityClient from "../client.js";
import "./project.css";

export default function Project() {
    const [projectData, setProjectData] = useState(null);
    useEffect(() => {
        sanityClient.fetch(
            `*[_type=="project"]{
            title,
            date,
            place,
            description,
            projectType,
            link,
            tags
        }`
        )
        .then((data) => setProjectData(data))
        .catch(console.error);

    }, []);

    return (
        <main className="background">
            <div class='box'>
                <div class='wave -one'></div>
                <div class='wave -two'></div>
                <div class='wave -three'></div>
            </div>

            
            <section className="projects-page">
                <h1>My Projects</h1>
                <h2>Here are my finished projects.</h2>
                <section className="projects-page-container">
                    {projectData && projectData.map((project, index)=>(
                    <article className="projects-page-card">
                        <div className="projects-page-card-title">
                                <h3><a href={project.link} alt={project.title} target="_blank" rel="noopener noreferrer" >{project.title}</a></h3> 
                        <div className="projects-page-card-info">
                            <span>
                                <strong>Finished</strong>:{""}{new Date(project.date).toLocaleDateString()}
                            </span>
                        
                            <span>
                                <strong>At</strong>:{""}{project.place}
                            </span>
                            <span>
                                <strong>Type</strong>:{""}{project.projectType}
                                    </span> 
                            <div className="substring30">
                                        <p>{project.description.substring(0, 30)}...</p> </div> </div> </div>
                            <div className="projects-page-card-info-pointer">
                                <a href={project.link} alt={project.title} target="_blank" rel="noopener noreferrer"> View The Project {""}
                                <span role="img" aria-label="right pointer">👉</span>
                            </a> </div>
                            

                    </article>
                    ))}
                </section>
            </section>
      
        </main>
    )
}