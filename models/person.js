//Les modèles Mongoose représentent les schémas de vos données

// Créer une personne avec ce prototype
const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] },
});

module.exports = mongoose.model("person", PersonSchema);
