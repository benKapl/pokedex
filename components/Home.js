import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import Button from './Button';

function Home() {
  const [pokemonsData, setPokemonsData] = useState([])
  const [count, setCount] = useState(1)

  const numByPage = 15;

  const fetchPokemonData = async() => {
    const newPokemons = []

    for (let i=count; i < count + numByPage; i++) {
      // fetch one Pokemon from pokeAPI
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
      // add pokemon to temp array
      const pokemon = {
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Capitalize first letter
        type: data.types[0].type.name,
        imgFrontDefault: data.sprites.front_default,
        imgBackDefault: data.sprites.back_default,
        imgFrontShiny: data.sprites.front_shiny,
        imgBackShiny: data.sprites.back_shiny,
        id: i,
      }
      newPokemons.push(pokemon)
    }
    // update pokemonData with new pokemons
    setPokemonsData([...pokemonsData, ...newPokemons]) 
    // update pokemonsCount (used to get startindex)
    setCount(count + numByPage)
  }

  const switchPictures = () => {
    const pokemons = pokemonsData
    for (let pokemon of pokemons) {
      
      let imgUrl = pokemon.img;
      
      if (pokemon.img.includes("back")) {
        pokemon["img"] = imgUrl.replace("back", "")
      } else {
        pokemon["img"] = imgUrl.slice(0, 73) + "back/" + String(pokemon.id) + imgUrl.slice(-4)
      }
    }
  
    setPokemonsData[pokemons]

  }



  useEffect(() => {
      fetchPokemonData()
  }, [])

  const pokemonCards = pokemonsData.map((data, index) => {
    return <PokemonCard key={index} img={data.imgFrontDefault} {...data}/>
  })

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>Pokedex</h1>
        <div className={styles.pokemonContainer}>
          {pokemonCards}
        </div>
        <div className={styles.buttons}>
          {/* <Button onClick={switchPictures}>Switch</Button> */}
          <Button onClick={fetchPokemonData}>Next</Button>
        </div>
      </main>
    </div>
  );
}

export default Home;
