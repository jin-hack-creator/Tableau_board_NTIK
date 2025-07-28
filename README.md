# NTIK Admin Panel

Ce projet est un panneau d’administration centralisé pour la gestion des écoles abonnées à NTIK.

## Stack technique
- Frontend : React (Vite)
- Base de données & Auth : Supabase

## Modules prévus
- Dashboard (tableau de bord)
- Gestion des écoles
- Suivi des paiements
- Gestion des comptes utilisateurs
- Messagerie & notifications
- Paramètres système

## Démarrage
1. Copier le fichier `.env.example` en `.env` et renseigner les clés Supabase
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer le projet :
   ```bash
   npm run dev
   ```

## Configuration Supabase
- Renseigner l’URL et la clé publique dans le fichier `.env`.
- Utiliser le SDK `@supabase/supabase-js` pour toutes les requêtes.

## Sécurité
- L’accès à l’admin panel est réservé aux super admins NTIK.

---

Pour toute question, contactez l’équipe technique NTIK.
