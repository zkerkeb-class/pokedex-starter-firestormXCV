import './CompareModal.css';
import StatRadar from '../pokemonDetails/StatRadar';

const CompareModal = ({ pokemon1, pokemon2, onClose }) => {
  return (
    <div className="compare-modal-overlay">
      <div className="compare-modal-box">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="compare-pokemons">
          <div className="pokemon-compare red-border">
            <img src={pokemon1.image} alt={pokemon1.name.french} />
            <h3>{pokemon1.name.french}</h3>
          </div>
          <div className="pokemon-compare blue-border">
            <img src={pokemon2.image} alt={pokemon2.name.french} />
            <h3>{pokemon2.name.french}</h3>
          </div>
        </div>
        <StatRadar stats1={pokemon1.base} stats2={pokemon2.base} />
      </div>
    </div>
  );
};

export default CompareModal;
