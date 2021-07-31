import React from "react";
import Card from "./Card";

const Team = () =>{

    const team = JSON.parse(localStorage.getItem("team"));
    console.log(JSON.parse(localStorage.getItem("team")))

    if(JSON.parse(localStorage.getItem("team")) === null){
        return (<div>Create your Team</div>)
    }

    return(
            <div>
                <div>
                    {team.map(pokemon => <Card id={pokemon.id} name={pokemon.name} image_url={pokemon.image_url}/>)}
                </div>
                
            </div>)
}

export default Team;
