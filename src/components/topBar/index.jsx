import pokemons from '../../assets/pokemons';
import "./index.css"

const TopBar = ({ search, setSearch, selectedType, setSelectedType, onAddClick, showShiny, setShowShiny }) => {
  const uniqueTypes = new Set(pokemons.flatMap(pokemon => pokemon.type));

  return (
    <div className="topbar-container">
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
        <option value="">Tous les types</option>
        {Array.from(uniqueTypes).map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <label className="shiny-toggle">
        <input
          type="checkbox"
          checked={showShiny}
          onChange={(e) => setShowShiny(e.target.checked)}
        />
        Shiny
      </label>

      {/* Bouton pour ouvrir la modal */}
      <button onClick={onAddClick} className="add-pokemon-button">
        + Ajouter un Pokémon
      </button>
    </div>
  );
};

export default TopBar;
