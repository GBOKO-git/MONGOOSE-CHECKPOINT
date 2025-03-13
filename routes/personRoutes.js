// Les routes gèrent les différentes requêtes HTTP et appellent les contrôleurs
const express = require("express");
const router = express.Router();
const personController = require("../controllers/personController");

// Routes pour gérer les personnes
// Créer une personne
router.post("/create", personController.createPerson);
// Créer plusieurs personnes
router.post("/create-multiple", personController.createMultiplePeople);
// Trouver une personne par nom
router.get("/find-by-name", personController.findPeopleByName);
// Ajouter un aliment aux favoris
router.put("/add-food/:personId", personController.addFoodToFavorites);
// Mettre à jour l'âge
router.put("/update-age", personController.updatePersonAge);
// Supprimer une personne par ID
router.delete("/remove/:personId", personController.removePersonById);
// Supprimer des personnes par nom
router.delete("/remove-by-name", personController.removePeopleByName);

module.exports = router;
