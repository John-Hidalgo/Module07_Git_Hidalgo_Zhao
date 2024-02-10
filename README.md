## Mandat

Dans le cadre de ce travail, nous voulons pousser plus loin notre concept pour une application Web de liste de répertoire en ligne prévue pour être utilisée par un administrateur et des clients.

Le travail s’effectuera en équipe de deux. Afin de mieux organiser notre développement, nous définirons des récits utilisateurs qui seront assignés à chaque membre de l’équipe. Ainsi il vous sera possible de faire votre partie indépendamment de l’avancement de vos coéquipiers. Les récits devront être découpés en tâches et chacune d’elles devra être dans un seul commit fonctionnel.

Une grande marge de manœuvre vous est accordée pour ce travail. Assurez-vous de bien définir votre stratégie avant de vous avancer trop loin. Pour la durée du travail, l’enseignant assumera les rôles de client et de chef d’équipe. Dans le doute, référez-vous à lui!

## Fonctionnalités :

### 1. Section administrateur

Au niveau administrateur, on veut gérer le répertoire ainsi que des demandes spéciales :

Les récits utilisateurs sont :

- En tant qu’administrateur, je veux être capable de consulter les données de mon répertoire;
- En tant qu’administrateur, je veux pouvoir créer une pièce en lui spécifiant un titre, un artiste et une ou plusieurs catégories;
- En tant qu’administrateur, je veux pouvoir modifier les données d’une pièce existante;
- En tant qu’administrateur, je veux pouvoir retirer une pièce de mon répertoire;
- En tant qu’administrateur, je veux être capable de consulter toutes les demandes spéciales envoyées par les clients;
- En tant qu’administrateur, je veux être capable d’étiqueter une demande traitée comme étant inactive (sans pour autant la retirer de l’historique des demandes spéciales);
- En tant qu’administrateur, je veux être capable de consulter uniquement les demandes spéciales actives;
- En tant qu’administrateur, je veux être capable de trier les demandes spéciales par date d’ajout selon l’ordre croissant ou décroissant;
- En tant qu’administrateur, je veux être capable de filtrer les demandes spéciales par nom de client;
- En tant qu’administrateur, je veux être capable de consulter les 5 pièces les plus demandées.

### 2. Section client :

Cette section concerne la partie client pour ce qui est de la gestion des demandes spéciales.

Les récits utilisateurs sont :

- En tant que client, je veux être capable de consulter le répertoire disponible trié par catégories;
- En tant que client, je veux être capable de créer une nouvelle liste de demandes spéciales en y ajoutant mon nom;
- En tant que client, je veux être capable d’ajouter n’importe quelle pièce à une liste de demandes spéciales;
- En tant que client, je veux être capable de retirer n’importe quelle pièce d’une liste de demandes spéciales;
- En tant que client, je veux être capable d’envoyer une liste de demande spéciales avec mon nom;
- En tant que client, lors de la création/modification d’une liste de demandes spéciales, je veux être capable de trier les pièces du répertoire par ordre croissant et décroissant des champs « titre », « artiste » et « catégorie ».
- En tant que client, lors de la création/modification d’une liste de demandes spéciales, je veux être capable d’entrer des caractères pour filtrer le répertoire selon le titre, l’artiste et la catégorie;

## Pondération

Dans ce travail, une fonctionnalité est assignée par équipier dont il/elle est reponsable. L’avancement des fonctionnalités de vos coéquipiers n’affectera pas votre note individuelle.

Les points qui seront évalués pour le travail individuel seront :

- Respect des fonctionnalités souhaitées (15 points);
- Qualité du code (5 points);
- Découpage et qualité des commits (5 points);
- Convivialité de l’application (3 points);
- Présence de fichiers JSON pour peupler la base de données (2 points).

Note d’équipe (5 points) :

Sur Git, organisez vos travaux de manière à éviter de faire des commits en parallèle. Structurez votre branche de développement principale de manière à être la plus linéaire possible. Un bonus de 10 points sera accordé à une équipe qui arrive à faire tout son développement sans aucun embranchement.

## Structure du DB

TP

- pieces
- commandes
- clients
## Liste du taches

| db       | method | api                         | fonction |
| -------- | ------ | --------------------------- | -------- |
| pieces   | GET    | /api/pieces                 |          |
| pieces   | GET    | /api/pieces/:id             |          |
| pieces   | POST   | /api/pieces/ajouter         |          |
| pieces   | PUT    | /api/pieces/:id/modifier    |          |
| pieces   | DELETE | /api/pieces/:id/supprimer   |          |
| demandes | GET    | /api/commandes              |          |
| demandes | GET    | /api/commandes/:nomClient   |          |
| demandes | GET    | /api/commandes/actift       |          |
| demandes | GET    | /api/commandes/:id          |          |
| demandes | POST   | /api/commandes/ajouter      |          |
| demandes | PUT    | /api/commandes/:id/inactif  |          |
| demandes | PUT    |/api/commandes/:nomCommande/ajouter  |          |
| demandes | PUT    | /api/commandes/:id/modifier  |          |
| demandes | DELETE | /api/commandes:/id/supprimer |          |
| clients  | Get    | /api/clients                |          |
| clients  | GET    | /api/clients/:id            |          |
| clients  | POST   | /api/clients/ajouter        |          |
| clients  | POST   | /api/login                  |          |
| clients  | PUT    | /api/clients:/id/modifer    |          |
| clients  | DELETE | /api/clients:/id/supprimer  |          |

## Pages

- Home
- Admin
- Inscrire
- Login
- Liste(s) commande du client
- Repertoire Client
- Client-Creer-Liste
- Repertoire Admin
- Les manipulations Admin

### John

| tache                                                                                           |  temps  |
| ----------------------------------------------------------------------------------------------- | ------- |
| Consulter les données de mon répertoire                                                         |   2h    |
| Créer une pièce en lui spécifiant un titre, un artiste et une ou plusieurs catégories           | 45 mins |
| Modifier les données d’une pièce existante                                                      |  5 mins |
| Consulter toutes les demandes spéciales envoyées par les clients                                | 30 mins |
| Capable d’étiqueter une demande traitée comme étant inactive                                    | 15 mins |
| Capable de consulter uniquement les demandes spéciales actives                                  |  5 mins |
| Capable de trier les demandes spéciales par date d’ajout selon l’ordre croissant ou décroissant | 25 mins |
| Consulter les 5 pièces les plus demandées                                                       | 30 mins |

### ChangFeng

| tache     | temps |
| --------- | ----- |
| page home |   2h  |
| page Admin| 1.5h  |
| page Inscrire |  1h     |
| page Login |   50 min    |
| page Liste commande Client |   3 h    |
| page Repertoire Client     |   3 h    |
| page Creer Liste Client     |   30 min   |
