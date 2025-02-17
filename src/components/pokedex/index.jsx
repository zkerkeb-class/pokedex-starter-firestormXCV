
import { useState } from "react"
import pokemons from '../../assets/pokemons'
import PokemonCard from "../pokemonCard";
import "./index.css"

const Pokedex = () => {
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const uniqueTypes = new Set(pokemons.flatMap(pokemon => pokemon.type));


    const handleChange = (event) => {
        setSearch(event.target.value);
    }; 

    const HandleTypeChange = (event) => {
        setSelectedType(event.target.value)
        console.log(selectedType)
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher un Pokémon..."
                value={search}
                onChange={handleChange}
            />
            <select value={selectedType} onChange={HandleTypeChange}>
                <option value="">Tous les types</option>
                {Array.from(uniqueTypes).map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

           <div className="pokemon-list">
                {pokemons
                    .filter((pokemon) =>
                        pokemon.name.french.toLowerCase().includes(search.toLowerCase()) && (selectedType === '' || pokemon.type.includes(selectedType))
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