Votre Objectif

 

Dans ce point de contrôle, vous allez effectuer une série d'instructions guidées pour manipuler et gérer votre base de données en utilisant Mongoose

PS : n'oubliez pas de commenter votre code avant de le soumettre.

Instructions

 

Installation et configuration de Mongoose:

Ajoutez MongoDB et Mongoose au package.json du projet.  Stockez l'URI de votre base de données MongoDB Atlas dans le fichier .env privé en tant que MONGO_URI. Entourez l'URI de guillemets simples ou doubles et assurez-vous qu'il n'y a pas d'espace entre la variable et le `=` et la valeur et le `=`. Connectez-vous à la base de données en utilisant la syntaxe suivante :

`mongoose.connect(<Your URI> ;, { useNewUrlParser : true, useUnifiedTopology : true }) ; `

 

Créer une personne avec ce prototype :

- Prototype de personne -

--------------------

name : string [required]

age : number

favoriteFoods : array of strings (*)

 

Utilisez les types du schéma de base de la mangouste. Si vous le souhaitez, vous pouvez également ajouter des champs supplémentaires, utiliser des validateurs simples tels que required ou unique, et définir des valeurs par défaut. Voir la documentation de la mangouste.

 

Créer et sauvegarder un enregistrement d'un modèle:

Créer une instance de document en utilisant le constructeur Person que vous avez construit précédemment. Passez au constructeur un objet contenant les champs name, age et favoriteFoods. Leurs types doivent être conformes à ceux du schéma Person. Appelez ensuite la méthode document.save() sur l'instance de document renvoyée. Passez-lui un callback en utilisant la convention Node. 

 

/* Exemple */

/ ...

person.save(function(err, data) {

  // ...faites ce que vous voulez ici....

});

 

Créer de nombreux enregistrements avec model.create()

Il arrive que vous ayez besoin de créer de nombreuses instances de vos modèles, par exemple lorsque vous alimentez une base de données avec des données initiales. Model.create() prend un tableau d'objets comme [{nom : 'John', ...}, {...}, ...] comme premier argument et les enregistre tous dans la base de données.

 

Créer plusieurs personnes avec Model.create(), en utilisant l'argument de la fonction arrayOfPeople.

 

Utiliser model.find() pour rechercher dans votre base de données

Trouvez toutes les personnes ayant un nom donné, en utilisant Model.find() -> ; [Person]

 

Utilisez model.findOne() pour renvoyer un seul document correspondant de votre base de données

Trouvez une seule personne qui a un certain aliment dans ses favoris, en utilisant Model.findOne() -> ; Person. Utilisez l'argument de fonction food comme clé de recherche.

 

Utilisez model.findById() pour rechercher votre base de données par _id

Trouvez la (seule !!) personne ayant un _id donné, en utilisant Model.findById() -> ; Person. Utilisez l'argument de fonction personId comme clé de recherche.

 

Exécutez des mises à jour classiques en exécutant Find, Edit, puis Save

Trouvez une personne par _id (utilisez l'une des méthodes ci-dessus) avec le paramètre personId comme clé de recherche. Ajoutez "hamburger" à la liste des aliments préférés de la personne (vous pouvez utiliser Array.push()). Puis - dans le callback find - save() la personne mise à jour.

Note: Cela peut sembler délicat si, dans votre schéma, vous avez déclaré favoriteFoods comme un Array, sans spécifier le type (c.-à-d. [String]). Dans ce cas, favoriteFoods est par défaut de type mixte, et vous devez le marquer manuellement comme édité en utilisant document.markModified('edited-field'). Voir la documentation de Mongoose

 

Exécuter de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()

Trouve une personne par son nom et fixe son âge à 20 ans. Utilisez le paramètre de fonction personName comme clé de recherche.

Note: Vous devez renvoyer le document mis à jour. Pour ce faire, vous devez passer les options document { new : true } comme troisième argument à findOneAndUpdate(). Par défaut, ces méthodes renvoient l'objet non modifié.

 

Supprimer un document à l'aide de model.findByIdAndRemove

Supprimer une personne par son _id. Vous devez utiliser l'une des méthodes findByIdAndRemove() ou findOneAndRemove(). Ces méthodes sont similaires aux méthodes de mise à jour précédentes. Elles transmettent le document supprimé à la base de données. Comme d'habitude, utilisez l'argument personId de la fonction comme clé de recherche.

 

MongoDB et Mongoose - Supprimer de nombreux documents avec model.remove()

Supprimez toutes les personnes dont le nom est "Mary", en utilisant Model.remove(). Passez-la à un document de requête avec le champ name défini, et bien sûr, faites un callback.

Note: Le Model.remove() ne renvoie pas le document supprimé, mais un objet JSON contenant le résultat de l'opération, et le nombre d'éléments affectés. N'oubliez pas de le passer au callback done(), puisque nous l'utilisons dans les tests.

 

Chain Search Query Helpers to Narrow Results

Trouvez des personnes qui aiment les burritos. Triez-les par nom, limitez les résultats à deux documents et masquez leur âge. Enchaînez .find(), .sort(), .limit(), .select(), puis .exec(). Passez le rappel done(err, data) à exec().
