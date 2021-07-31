
import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import Card from "./Card";
import axios from "axios"

const AllPokemon = () =>{
    
    const [userInput, setUserInput] = useState("")
    const url = "https://pokeapi.co/api/v2/pokemon";
    const [urlPrev, setUrlPrev] = useState("")
    const [urlNext, setUrlNext] = useState("")
    const [pokemonData, setPokemonData] = useState([])
    const [statusMessage, setStatusMessage] = useState("")
    const [isExist, setIsExist] = useState(true)
    const history = useHistory()

    useEffect(()=>{
        const f = async () =>{
            const response = await axios.get(url);
            const data = response.data.results
            setUrlNext(response.data.next)
            setUrlPrev(response.data.previous)
            getPokemonInfo(data)
        }
        f()
    },[])

    const getPokemonInfo = async (data) =>{
        const pokemonData = await data.map(async (pokemon, index)=>{
            const pokemonInfo = await axios.get(pokemon.url);
            setPokemonData(pokemonData => [...pokemonData, pokemonInfo.data])
        })
    }

    const nextHandler = async () => {
        const response = await axios.get(urlNext);
        const data = response.data.results
        setUrlNext(response.data.next)
        setUrlPrev(response.data.previous)
        setPokemonData([])
        getPokemonInfo(data)
    }

    const backHandler = async () =>{
        if(urlPrev === null){
            return;
        }else{
            const response = await axios.get(urlPrev);
            const data = response.data.results
            setUrlNext(response.data.next)
            setUrlPrev(response.data.previous)
            setPokemonData([])
            getPokemonInfo(data)
        }
        }
    
    const searchHandler = async () => {
        try{
            const searchUrl = "https://pokeapi.co/api/v2/pokemon/" + userInput.toString().toLowerCase()
            const response = await axios.get(searchUrl);
            const data = response.data
            if(data.count != 1118){
                setIsExist(true)
                history.push({pathname:'/pokemon/search/result', state:{data:data}})
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
        

    pokemonData.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

    return (<div className="all-pokemons">

                <div className="all-pokemon-top-container">
                    <div>
                        <input onChange={(e)=> {setUserInput(e.target.value)}} className="search-input" placeholder="Enter Pokédex ID or Name..."></input>
                        <button onClick={searchHandler} className="search-btn">Search</button>
                    </div>
                    <div>
                        <button onClick={backHandler} className="pagination-btn">Back</button>
                        <button onClick={nextHandler} className="pagination-btn">Next</button>
                    </div>
                </div>
                
                {isExist ? null : <p style={{color:"#F32013", fontSize:"1rem"}}>{statusMessage}</p>}
                
                <div className="grid-container">
                    {pokemonData.map((pokemon, index)=>{

                        return <Card
                            key={index} 
                            id={pokemon.id}
                            name={pokemon.name}
                            height={pokemon.height}
                            weight={pokemon.weight}
                            types={pokemon.types}
                            abilities={pokemon.abilities}
                            image_url = {pokemon.sprites.front_default}
                        />
                    })}   
                </div>
            </div>)
}

export default AllPokemon;