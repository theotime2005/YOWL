# YOWL

Pour utiliser ce code avec une base de données MongoDB :

Créez un compte sur MongoDB Atlas ou utilisez une instance MongoDB existante.
Créez une base de données et obtenez l'URI de connexion fournie par MongoDB Atlas ou votre instance MongoDB.
Remplacez la balise de remplacement MONGO_URL dans le fichier .env (ou tout autre fichier où cette configuration est nécessaire) par l'URI de connexion que vous avez obtenu.


# README de l'API
## Introduction
Il s'agit d'une API Node.js basique utilisant Express et MongoDB, conçue pour gérer l'inscription d'utilisateurs, la connexion, la création de publications, la mise à jour, la suppression, la gestion de profil utilisateur, ainsi que le suivi/désabonnement d'autres utilisateurs. L'API utilise bcrypt pour le hachage des mots de passe et MongoDB comme base de données.

## Mise en route
### Prérequis
Node.js installé
Un compte MongoDB Atlas (ou une autre instance MongoDB)
Un éditeur de code (par exemple, VSCode)

#### Installation
Clonez le dépôt :
```bash
git clone https://github.com/theotime2005/YOWL.git
cd YOWL/back
```
Installez les dépendances :
```bash
npm install
```
#### Configuration
Obtenez une URI MongoDB auprès de MongoDB Atlas ou de votre instance MongoDB.
Vous devez créer un fichier ".env" dans le dossier back et y ajouter les lignes suivantes, en les complétant avec vos informations d'identifications
```env
HOST = "url_mongo_db"
MAIL_SERVER="smtp.myserver.com"
MAIL_ADRESS="votre_adresse@myserver.com"
MAIL_PASSWORD="votre_mot_de_passe"

### Utilisation
#### Authentification de l'utilisateur
##### Inscrire un utilisateur
```http
http://localhost:8800/api/auth/register
Content-Type: application/json
```
Méthode : POST
Description : Inscrivez un nouvel utilisateur avec un nom d'utilisateur, un e-mail et un mot de passe uniques.
Corps de la requête :
```json
{
  "username": "votre_nom_utilisateur",
  "email": "votre_email@example.com",
  "password": "votre_mot_de_passe"
}
```
Réponse :
Succès : 200 OK avec les détails de l'utilisateur inscrit.
Échec : 500 Internal Server Error avec un message d'erreur.

##### Connexion
```http
http://localhost:8800/api/auth/login
Content-Type: application/json
```
Méthode : POST
Description : Authentifiez un utilisateur avec son nom d'utilisateur et son mot de passe.
Corps de la requête :
```json
{
  "username": "votre_nom_utilisateur",
  "password": "votre_mot_de_passe"
}
```
Réponse :
Succès : 200 OK avec les détails de l'utilisateur authentifié.
Échec : 404 Not Found si l'utilisateur n'est pas trouvé, 400 Bad Request si le mot de passe est incorrect, ou 500 Internal Server Error pour d'autres erreurs.

#### Gestion des publications
##### Créer une publication
```http
http://localhost:8800/api/POST
Content-Type: application/json
```
Méthode : POST
Description : Créez une nouvelle publication.
Corps de la requête :
```json
{
  "userId": "identifiant_utilisateur",
  "content": "contenu_de_la_publication"
}
```
Réponse :
Succès : 200 OK avec les détails de la publication créée.
Échec : 500 Internal Server Error avec un message d'erreur.

##### Mettre à jour une publication
```http
http://localhost:8800/api/post/:ID
Content-Type: application/json
```
Méthode : PUT
Description : Mettez à jour une publication par son ID.
Corps de la requête :
```json
{
  "userId": "identifiant_utilisateur",
  "content": "contenu_de_la_publication_modifié"
}
```
Réponse :
Succès : 200 OK avec un message de réussite.
Échec : 403 Forbidden si l'utilisateur ne possède pas la publication, ou 500 Internal Server Error pour d'autres erreurs.

##### Supprimer une publication
```http
http://localhost:8800/api/posts/:id
Content-Type: application/json
```
Méthode : DELETE
Description : Supprimez une publication par son ID.
Corps de la requête :
```json
{
  "userId": "identifiant_utilisateur"
}
```
Réponse :
Succès : 200 OK avec un message de réussite.
Échec : 403 Forbidden si l'utilisateur ne possède pas la publication, ou 500 Internal Server Error pour d'autres erreurs.

##### Aimer/Désaimer une publication
```http
http://localhost:8800/api/posts/:id/like
Content-Type: application/json
```
Méthode : PUT
Description : Aimez ou n'aimez pas une publication par son ID.
Corps de la requête :
```json
{
  "userId": "identifiant_utilisateur"
}
```
Réponse :
Succès : 200 OK avec un message de réussite.
Échec : 500 Internal Server Error avec un message d'erreur.

##### Obtenir une seule publication
```http
http://localhost:8800/api/posts/:id
Accept: application/json
```
Méthode : GET
Description : Récupérez une publication par son ID.
Réponse :
Succès : 200 OK avec les détails de la publication.
Échec : 500 Internal Server Error avec un message d'erreur.

##### Obtenir la chronologie de l'utilisateur
```http
http://localhost:8800/api/posts/timeline/all
Accept: application/json
```
Méthode : GET
Description : Récupérez les publications de l'utilisateur et de ceux qu'il suit.
Corps de la requête :
```json
{
  "userId": "identifiant_utilisateur"
}
```
Réponse :
Succès : 200 OK avec un tableau de publications.
Échec : 500 Internal Server Error avec un message d'erreur.

#### Gestion du profil utilisateur
##### Mettre à jour le profil utilisateur
```http
http://localhost:8800/api/users/:id
Content-Type: application/json
```
Méthode : PUT
Description : Mettez à jour le profil utilisateur par ID.
Corps de la requête :
```json
{
  "userId": "identifiant_utilisateur",
  // Inclure d'autres champs à mettre à jour (par exemple, "username", "email", "password")
}
```
Réponse :
Succès : 200 OK avec un message de réussite.
Échec : 403 Forbidden si l'utilisateur ne possède pas le compte, ou 500 Internal Server Error pour d'autres erreurs.

##### Supprimer le compte utilisateur
```http
http://localhost:8800/api/users/:id
Content-Type: application/json
```
Méthode : DELETE
Description : Supprimez le compte utilisateur par ID.