# Pokémon Team Builder  
** Angular 20 • Signals • Standalone Components • PokéAPI**

> Mini-application Angular 20 pour fetcher la liste des Pokémon via [PokéAPI](https://pokeapi.co) et constituer une **équipe de 6 Pokémon max** (liste à gauche, équipe à droite).  
> Projet personnel d'apprentissage des features apparues dans Angular 18-20 (signals, resources, state management)

---

## Fonctionnalités

- **Fetch automatique** : Charge la liste des 151 Pokémon (Gen 1) au démarrage via PokéAPI.
- **Affichage liste** : Colonne gauche avec cards pour chaque Pokémon (nom + ID).
- **Gestion d'équipe** : Colonne droite – add/delete via button reactif (max 6, avec validation et feedback UI)
- **UI réactive** : Mise à jour instantanée (pas de re-renders inutiles grâce aux signals).
- **Responsive** : Layout deux-colonnes (flexbox) qui s'adapte mobile/desktop.

**Démos live idéales :** Load → Clic ajout (x6) → Tentative 7e bloquée → Suppression → Équipe vide.

## Lancer le Projet

Prérequis : Node.js 20+ et Angular CLI 20+ (`npm i -g @angular/cli@20`).

```bash
# Clone le repo
git clone https://github.com/antoinemc/pokemon-team-builder.git
cd pokemon-team-builder

# Install deps
npm install

# Lancer l'application en local
ng serve
# http://localhost:4200


# Tests unitaires
ng test

## Demo live 
https://pokemon-team-builder-demo.vercel.app/
