import { useState,useEffect } from "react"
import "./index.css"

const PokemonCard = ({name, types, image, attack, defense, hp}) => {
    const [currentHP, setCurrentHP] = useState(hp)

    useEffect(() => {
        //alert("le combat commence")
    
    }, [])

    useEffect(() => {
            console.log('currentHP useEffect', currentHP)
        if (currentHP <= 0) {
           alert("bulbizarre est mort")
        }
    }, [currentHP])

    const handleAttack = () => {
        console.log("bulbizarre ce mange une patate")
        setCurrentHP(currentHP - 10)
    }
 
    return (
        <div className="pokemon-card">
            <div className="pokemon-name-container">
                <h1 className="pokemon-name">{name}</h1>
            </div>
            <div className="pokemon-image-container">
                <img className="pokemon-image" src={image} alt={name} />
            </div>
            {types?.join(', ')}
            <p>Attack: {attack}</p>
            <p>Defense: {defense}</p>
            <p>HP: {currentHP}</p>
            <button onClick={handleAttack}>Attack</button>

        </div>
    )
}

export default PokemonCard