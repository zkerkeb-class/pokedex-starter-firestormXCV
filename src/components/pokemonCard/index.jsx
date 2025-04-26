import { useState,useEffect } from "react"
import "./index.css"

const PokemonCard = ({name, types, image, attack, defense, hp, showShiny, isSelected  }) => {
    const [imgSrc, setImgSrc] = useState(image);

    useEffect(() => {
        if (showShiny) {
        const shinyImage = image.replace('/pokemons/', '/pokemons/shiny/');
        setImgSrc(shinyImage);
        } else {
        setImgSrc(image);
        }
    }, [showShiny, image]);


    const backgroundType = types && types.length > 0 ? types[0].toLowerCase() : null;
    const backgroundUrl = backgroundType
        ? `./src/assets/background/${backgroundType}.webp`
        : null;

    return (
        <div className="pokemon-card" style={
            
            backgroundUrl
              ? {
                  backgroundImage: `url(${backgroundUrl})`,
                  backgroundSize: 'cover',          // Étire l'image pour couvrir toute la div sans déformer
                  backgroundPosition: 'center',     // Centre l'image
                  backgroundRepeat: 'no-repeat',    // Empêche la répétition
                  imageRendering: 'auto'            // S'assure du bon lissage
                }
              : {}
          } >
            <div className="pokemon-name-container">
                <h1 className="pokemon-name">{name}</h1>
            </div>
            <div className="pokemon-image-container">
                <img
                    className="pokemon-image"
                    src={imgSrc}
                    alt={name}
                    onError={() => setImgSrc(image)} // fallback vers image normale
                />
            </div>
            <div className="pokemon-stat">
                {types?.join(', ')}
                <p>Attack: {attack}</p>
                <p>Defense: {defense}</p>
                <p>HP: {hp}</p>
            </div>
            <br />
            <button className="button-more">Details</button>

        </div>
    )
}

export default PokemonCard