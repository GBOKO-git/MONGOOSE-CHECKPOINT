// Ce fichier contient toute la logique métier pour manipuler les personnes dans la base de données.
const Person = require("../models/person");

// Créer une nouvelle personne
const createPerson = async (req, res) => {
  const { name, age, favoriteFoods } = req.body;

  try {
    const newPerson = new Person({ name, age, favoriteFoods });
    await newPerson.save();
    res
      .status(201)
      .json({ message: "Personne enregistrée avec succès", data: newPerson });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la personne",
      error: error.message,
    });
  }
};

// Créer plusieurs personnes
const createMultiplePeople = async (req, res) => {
  const arrayOfPeople = [
    { name: "amara", age: 30, favoriteFoods: ["garba", "tomate"] },
    { name: "gboko", age: 25, favoriteFoods: ["alloco", "glace"] },
    { name: "aicha", age: 40, favoriteFoods: ["igname", "riz"] },
  ];

  try {
    const createdPeople = await Person.create(arrayOfPeople);
    res
      .status(201)
      .json({ message: "Personnes créées avec succès", data: createdPeople });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création des personnes",
      error: error.message,
    });
  }
};

// Trouver des personnes par nom
const findPeopleByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Le nom est requis" });
  }

  try {
    const people = await Person.find({ name });
    res.status(200).json({ message: "Personnes trouvées", data: people });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la recherche", error: error.message });
  }
};

// Ajouter "hamburger" aux aliments favoris d'une personne
const addFoodToFavorites = async (req, res) => {
  const { personId } = req.params;

  try {
    const person = await Person.findById(personId);
    if (!person) {
      return res
        .status(404)
        .json({ message: `Aucune personne trouvée avec l'ID : ${personId}` });
    }

    person.favoriteFoods.push("hamburger");
    person.markModified("favoriteFoods"); // Marquer comme modifié
    await person.save();
    res
      .status(200)
      .json({ message: "Aliment ajouté avec succès", data: person });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

// Mettre à jour l'âge d'une personne
const updatePersonAge = async (req, res) => {
  const { personName } = req.query;

  if (!personName) {
    return res.status(400).json({ message: "Le nom est requis" });
  }

  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ message: "Personne non trouvée" });
    }
    res.status(200).json({ message: "Âge mis à jour", data: updatedPerson });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la mise à jour",
        erreur: error.message,
      });
  }
};

// Supprimer une personne par ID
const removePersonById = async (req, res) => {
  const { personId } = req.params;

  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    if (!removedPerson) {
      return res.status(404).json({ message: "Personne non trouvée" });
    }
    res
      .status(200)
      .json({ message: "Personne supprimée avec succès", data: removedPerson });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression",
        erreur: error.message,
      });
  }
};

// Supprimer des personnes par nom
const removePeopleByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Le nom est requis" });
  }

  try {
    const result = await Person.remove({ name });
    res
      .status(200)
      .json({ message: `${result.deletedCount} personne(s) supprimée(s)` });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression",
        erreur: error.message,
      });
  }
};

module.exports = {
  createPerson,
  createMultiplePeople,
  findPeopleByName,
  addFoodToFavorites,
  updatePersonAge,
  removePersonById,
  removePeopleByName,
};
