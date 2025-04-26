
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import { getAllPokemons, createPokemon  } from "../../services/api";
import PokemonCard from "../pokemonCard";
import TopBar from "../topBar";
import CompareModal from "../compareModal/CompareModal";
import "./index.css"
import AddPokemonModal from '../addPokemonModal/AddPokemonModal';

const Pokedex = () => {
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showShiny, setShowShiny] = useState(false);
    const [comparisonMode, setComparisonMode] = useState(false);
    const [selectedPokemons, setSelectedPokemons] = useState([]);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const selectedPokemonData = pokemons.filter(p => selectedPokemons.includes(p.id));


    const handleSelectPokemon = (id) => {
        setSelectedPokemons(prev => {
          if (prev.includes(id)) {
            return prev.filter(p => p !== id);
          } else if (prev.length < 2) {
            return [...prev, id];
          }
          return prev;
        });
    };
      

    const handleAddClick = () => {
        setShowModal(true);
    };
    
    const handleModalClose = () => {
    setShowModal(false);
    };
    
    const handlePokemonCreate = async (newPokemonData) => {
        const created = await createPokemon(newPokemonData);
        if (created) {
            console.log("Pokémon ajouté :", created);
            // TODO: ajouter à la liste ou refresh
        } else {
            console.error("Échec de création du Pokémon");
        }
    };

    const loadPokemons = async () => {
        const data = await getAllPokemons();
        setPokemons(data);
    };

    useEffect(() => {
        loadPokemons();
    }, [])
    
    useEffect (() => {
        console.log(search)
    }, [search])

    useEffect(() => {
        if (!comparisonMode) {
          setSelectedPokemons([]);
          setShowCompareModal(false);
        }
    }, [comparisonMode]);
      

    return (
        <div>
            <TopBar 
                search={search} 
                setSearch={setSearch} 
                selectedType={selectedType} 
                setSelectedType={setSelectedType} 
                onAddClick={handleAddClick}
                showShiny={showShiny}
                setShowShiny={setShowShiny}
                comparisonMode={comparisonMode}
                setComparisonMode={setComparisonMode}
            ></TopBar>

            {comparisonMode && (
                <div className="compare-bar">
                    <button
                    onClick={() => setShowCompareModal(true)}
                    disabled={selectedPokemons.length !== 2}
                    >
                    Comparer
                    </button>
                </div>
            )}

            {showCompareModal && selectedPokemonData.length === 2 && (
                <CompareModal
                    pokemon1={selectedPokemonData[0]}
                    pokemon2={selectedPokemonData[1]}
                    onClose={() => setShowCompareModal(false)}
                />
            )}


            {showModal && (
                <AddPokemonModal
                onClose={handleModalClose}
                onSubmit={handlePokemonCreate}
                />
            )}

           <div className="pokemon-list">
                {pokemons
                    .filter((pokemon) =>
                        pokemon != null && pokemon.name.french.toLowerCase().includes(search.toLowerCase()) && (selectedType === '' || pokemon.type.includes(selectedType)) 
                    )
                    .map((pokemon) => (
                        
                        <div className="pokemon-card-container">

                            {comparisonMode ? (
                                <div
                                    className={`pokemon-link selectable ${selectedPokemons.includes(pokemon.id) ? "selected" : ""}`}
                                    onClick={() => handleSelectPokemon(pokemon.id)}
                                    >
                                    <PokemonCard
                                        key={pokemon.id}
                                        attack={pokemon.base?.Attack}
                                        defense={pokemon.base?.Defense}
                                        hp={pokemon.base?.HP}
                                        image={pokemon.image}
                                        name={pokemon.name.french}
                                        types={pokemon.type}
                                        showShiny={showShiny}
                                    />
                                </div>

                                ) : (
                                <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link">
                                    <PokemonCard
                                        key={pokemon.id}
                                        attack={pokemon.base?.Attack}
                                        defense={pokemon.base?.Defense}
                                        hp={pokemon.base?.HP}
                                        image={pokemon.image}
                                        name={pokemon.name.french}
                                        types={pokemon.type}
                                        showShiny={showShiny}
                                    />
                                </Link>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Pokedex