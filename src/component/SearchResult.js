import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import Card from "./Card";
import axios from "axios";


const SearchResult = () => {
    const location = useLocation();
    const [pokemonData, setPokemonData] = useState(location.state.data)
    const [userInput, setUserInput] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const [isExist, setIsExist] = useState(true)

    const searchHandler = async () => {
        try{
            const searchUrl = "https://pokeapi.co/api/v2/pokemon/" + userInput.toString().toLowerCase()
            const response = await axios.get(searchUrl);
            const data = response.data
            if(data.count != 1118){
                setIsExist(true)
                setPokemonData(data)
            }else{
                setIsExist(false)
                setStatusMessage("Enter Pokédex ID or Name")
                setTimeout(()=>{
                    setIsExist(true)
                }, 3000)
            }
        }catch{
            setIsExist(false)
            setStatusMessage("Invalid Entry. Enter valid Pokédex ID or Name")
            setTimeout(()=>{
                setIsExist(true)
            }, 3000)
            return ;
        }
    }

    return (<div className="search-result">
                <h1>Search Result</h1>
                <Card
                    id={pokemonData.id}
                    name={pokemonData.name}
                    height={pokemonData.height}
                    weight={pokemonData.weight}
                    types={pokemonData.types}
                    abilities={pokemonData.abilities}
                    image_url = {pokemonData.sprites.front_default}
                    className="result-card"
                />
                <div className="search-result-search-bar">
                    <input onChange={(e)=> {setUserInput(e.target.value)}} className="search-input" placeholder="Enter Pokédex ID or Name..."></input>
                    <button onClick={searchHandler} className="search-btn">Search</button>
                    {isExist ? null : <p style={{color:"#F32013"}}>{statusMessage}</p>}
                </div>
            </div>)
}

export default SearchResult;

