import './AddPokemonModal.css';
import { useState } from 'react';

const AddPokemonModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: [],
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    image: '',
    description: '',
    height: '',
    weight: '',
    abilities: []
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'type') {
      setFormData({ ...formData, type: value.split(',').map(v => v.trim()) });
    } else if (name === 'abilities') {
      setFormData({ ...formData, abilities: value.split(',').map(v => v.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  
    formDataToSend.append('name', JSON.stringify({
        english: formData.name,
        french: formData.name
    }));
      
    formDataToSend.append('type', formData.type.join(','));
    formDataToSend.append('hp', formData.hp);
    formDataToSend.append('attack', formData.attack);
    formDataToSend.append('defense', formData.defense);
    formDataToSend.append('speed', formData.speed);
  
    if (formData.description) formDataToSend.append('description', formData.description);
    if (formData.height) formDataToSend.append('height', formData.height);
    if (formData.weight) formDataToSend.append('weight', formData.weight);
    if (formData.abilities.length) formDataToSend.append('abilities', formData.abilities.join(','));
    if (imageFile) formDataToSend.append('image', imageFile);
  
    onSubmit(formDataToSend);
    onClose();
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Ajouter un Pokémon</h2>
        <form onSubmit={handleSubmit}>

          {/* Champs requis */}
          <label>Nom *</label>
          <input type="text" name="name" required onChange={handleChange} />

          <label>Type(s) * (séparés par virgules)</label>
          <input type="text" name="type" required onChange={handleChange} />

          <label>HP *</label>
          <input type="number" name="hp" required onChange={handleChange} />

          <label>Attaque *</label>
          <input type="number" name="attack" required onChange={handleChange} />

          <label>Défense *</label>
          <input type="number" name="defense" required onChange={handleChange} />

          <label>Vitesse *</label>
          <input type="number" name="speed" required onChange={handleChange} />

          {/* Upload d’image */}
          <label>Image * (fichier PNG/JPG)</label>
          <input type="file" accept="image/*" required onChange={handleImageUpload} />

          {/* Champs optionnels */}
          <label>Description</label>
          <textarea name="description" onChange={handleChange} />

          <label>Hauteur</label>
          <input type="number" name="height" onChange={handleChange} />

          <label>Poids</label>
          <input type="number" name="weight" onChange={handleChange} />

          <label>Capacités (séparées par virgules)</label>
          <input type="text" name="abilities" onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit">Créer</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPokemonModal;
