// Le fichier principal pour démarrer votre serveur Express
require("dotenv").config();
const express = require("express");
const app = express();
const mongoDBConnection = require("./config/db");
const personRoutes = require("./routes/personRoutes");

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoDBConnection();

// Définir les routes
app.use("/model/person", personRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
