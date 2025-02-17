import { useState } from 'react'
import pokemons from './assets/pokemons'
import PokemonCard from './components/pokemonCard'
import './App.css'
import Pokedex from './components/pokedex'


function App() {
  const [count, setCount] = useState(0)
  // const nom = 'Zakaria'
  return (
    <div>
        <Pokedex/>
        
    </div>
    
  )
}

export default App