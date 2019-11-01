import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import ProjectCard from './projectCard';


const Project = () => {

    const [projectArray, setProjectArray] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/projects`)
            .then(res => {
                setProjectArray(res.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }, [])


    return (
        projectArray.map(project => 
        <div key={project.id}>
            <ProjectCard name={project.name} completed={project.completed} description={project.description}/>
        </div>    
        )
    )
}

export default Project;