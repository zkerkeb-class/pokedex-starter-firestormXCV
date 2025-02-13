
import { useState, useEffect } from "react"
import pokemons from '../../assets/pokemons'
import PokedexRow from '../../components/pokedexRow'
import PokemonCard from "../pokemonCard";
import "./index.css"

const Pokedex = () => {
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        setSearch(event.target.value);
    }; 

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher un Pokémon..."
                value={search}
                onChange={handleChange}
            />
           <div className="pokemon-list">
                {pokemons
                    .filter((pokemon) =>
                        pokemon.name.french.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                    )
                    .map((pokemon) => (
                        <div className="pokemon-card-container">
                            <PokemonCard
                                key={pokemon.id}
                                attack={pokemon.attack}
                                defense={pokemon.defense}
                                hp={pokemon.hp}
                                image={pokemon.image}
                                name={pokemon.name.french}
                                types={pokemon.type}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Pokedex