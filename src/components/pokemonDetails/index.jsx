import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPokemonById, deletePokemon, updatePokemon} from "../../services/api";
import { getPokemonCryUrl } from "../../services/api";
import speakerIcon from "../../assets/icons/speaker.png";
import sound from "../../assets/sounds/default.mp3";
import StatRadar from './StatRadar';



const PokemonDetail = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const loadPokemons = async () => {
        const data = await getPokemonById(id);
        setPokemon(data);
        console.log(data)
    };

    const playCry = async () => {
        setIsPlaying(true);
      
        let cryUrl = null;
      
        try {
          cryUrl = await getPokemonCryUrl(pokemon.id);
        } catch (err) {
          console.error("Erreur API Pokémon :", err);
        }
      
        const finalSound = cryUrl || sound;
        const audio = new Audio(finalSound);
      
        audio.play().catch((err) => {
          console.error("Erreur lecture audio :", err);
        });
      
        audio.onended = () => setIsPlaying(false);
    };
      
      
    

    useEffect(() => {
        loadPokemons();
    }, [id]);

    if (!pokemon) return <p>Chargement...</p>;

    return (
        <div>
            <h2>{pokemon.name.french}</h2>
            <img src={pokemon.image} alt={pokemon.name.french} />
            {pokemon.base && <StatRadar stats1={pokemon.base} />}

            {isEditing ? (
                <div>
                <label>Nom (français)</label>
                <input
                  type="text"
                  value={pokemon.name?.french}
                  onChange={(e) => setPokemon({ ...pokemon, name: { ...pokemon.name, french: e.target.value } })}
                />
              
                <label>HP</label>
                <input
                  type="number"
                  value={pokemon.base?.HP}
                  onChange={(e) => setPokemon({ ...pokemon, base: { ...pokemon.base, HP: e.target.value } })}
                />
              
                <label>Attaque</label>
                <input
                  type="number"
                  value={pokemon.base?.Attack}
                  onChange={(e) => setPokemon({ ...pokemon, base: { ...pokemon.base, Attack: e.target.value } })}
                />
              
                <label>Défense</label>
                <input
                  type="number"
                  value={pokemon.base?.Defense}
                  onChange={(e) => setPokemon({ ...pokemon, base: { ...pokemon.base, Defense: e.target.value } })}
                />
              
                <label>Sp. Attaque</label>
                <input
                  type="number"
                  value={pokemon.base?.SpAttack}
                  onChange={(e) => setPokemon({ ...pokemon, base: { ...pokemon.base, SpAttack: e.target.value } })}
                />
              
                <label>Sp. Défense</label>
                <input
                  type="number"
                  value={pokemon.base?.SpDefense}
                  onChange={(e) => setPokemon({ ...pokemon, base: { ...pokemon.base, SpDefense: e.target.value } })}
                />
              
                <label>Vitesse</label>
                <input
                  type="number"
                  value={pokemon.base?.Speed}
                  onChange={(e) => setPokemon({ ...pokemon, base: { ...pokemon.base, Speed: e.target.value } })}
                />
              </div>
              
             ) : (
                <div>
                    <p>{pokemon.name?.french}</p>
                    <p>HP: {pokemon.base?.HP}</p>
                    <p>Attaque: {pokemon.base?.Attack}</p>
                    <p>Défense: {pokemon.base?.Defense}</p>
                </div>
             )}
                 
            <button onClick={playCry} disabled={isPlaying} style={{ margin: "1rem" }}>
                <img src={speakerIcon} alt="Cri du Pokémon" style={{ width: "24px" }} />
            </button>                        
            
            <Link to={`/`} className="pokemon-link">
                <button onClick={() => deletePokemon(pokemon.id)}>Supprimer ce pokemon</button>
            </Link>
                       
            {isEditing ? (
                <button onClick={() => {
                    const updated = {
                      ...pokemon,
                      base: {
                        HP: Number(pokemon.base?.HP),
                        Attack: Number(pokemon.base?.Attack),
                        Defense: Number(pokemon.base?.Defense),
                        SpAttack: Number(pokemon.base?.SpAttack),
                        SpDefense: Number(pokemon.base?.SpDefense),
                        Speed: Number(pokemon.base?.Speed)
                      }
                    };
                  
                    updatePokemon(pokemon.id, updated);
                    setIsEditing(false);
                  }}>
                    Enregistrer
                  </button>
                  
            ) : <button onClick={() => setIsEditing(!isEditing)}>Editer ce pokemon</button> }

        </div>
    );
};

export default PokemonDetail;
