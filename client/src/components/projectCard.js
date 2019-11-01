import React from 'react';
// import styled from 'styled-components';

// const Card = styled.div`
//     padding: 1em;
//     margin: 1.5em;
//     display: flex;
//     flex-direction: column;
//     flex-basis: 20%;
//     background-color: pink;`

const ProjectCard = (props) => {
    const {name, description, completed} = props;
    
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <h5>{completed}</h5>
            <div>
            <button>edit</button>
            <button>delete</button>
            </div>
        </div>
    )
}

export default ProjectCard;