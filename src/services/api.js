import axios from "axios";

axios.defaults.withCredentials = true;

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.response?.data?.message || error.message);
      return null;
    }
};

export const registerUser = async (username, password) => {
    console.log(username)
    console.log(password)
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.response?.data?.message || error.message);
      return null;
    }
};
  

export const getAllPokemons = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/pokemons/");
        return response.data; 
    } catch (error) {
        console.error("Erreur API:", error);
        return null;
    }
};

export const getPokemonById = async (id) => {
    try {
        const response = await axios.get("http://localhost:3000/api/pokemons/" + id);
        return response.data; 
    } catch (error) {
        console.error("Erreur API:", error);
        return null;
    }
}

export const deletePokemon = async (id) => {
    try {
        const response = await axios.delete("http://localhost:3000/api/pokemons/" + id);
        console.log("Supprimer avec succès")
        return response.data; 
    } catch (error) {
        console.error("Erreur API:", error);
        return []
    }
}

export const createPokemon = async (formData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/pokemons", formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du Pokémon :", error);
    return null;
  }
};


export const updatePokemon = async (id, data) => {
  console.log(data)
    try {
        const response = await axios.put("http://localhost:3000/api/pokemons/" + id, data);
        return response.data; 
    } catch (error) {
        console.error("Erreur API:", error);
        return []
    }
}

export const logoutUser = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      return true;
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      return false;
    }
};
  

export const getCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/me");
      return response.data.user;
    } catch (error) {
      console.error("Erreur récupération utilisateur :", error);
      return null;
    }
};

export const getPokemonCryUrl = async (pokedexId) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokedexId}`, {
      withCredentials: false
    });
    const cryUrl = response?.data?.cries?.legacy;
    return cryUrl;
  } catch (error) {
    console.error("Erreur récupération du cri Pokémon :", error);
    return null;
  }
};
