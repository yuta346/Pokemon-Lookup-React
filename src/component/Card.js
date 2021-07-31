import React from  "react";


const Card = ({id, name, weight, height, types, abilities, image_url}) =>{


    return (<div className="card-flex-container">
                <div className="card">
                    <div className="card-header">
                        <div className="card-id"> <h4>No. {id}</h4></div>
                        <div className="card-name"><h4>{name}</h4></div>
                    </div>
                    
                    <img src={image_url} className="pokemon-image"></img>
                    <div className="card-info">
                        <div className="types">
                            <p>Type:</p>
                            {types.map((type)=>{
                                return (<div>
                                            <p>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</p>
                                        </div>)
                            })}
                        </div>

                        <hr/>
                        <p>Height: {height}</p>
                        <hr/>
                        <p>Weight: {weight}</p>
                        <hr/>

                        <div className="abilities">
                            <p>Ability:</p>
                            {abilities.map((ability)=>{
                                return  (<div className="ability">
                                            <p>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</p>
                                        </div>)
                            })}
                        </div>
                        
                    </div>
                </div> 
            </div>) 
}

export default Card;