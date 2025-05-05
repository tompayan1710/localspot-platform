# Feuille de route des fonctionnalités du Dashboard

## Partie 1 : Fonctionnalités pour les clients
1. **KPI principaux**
   - Total des scans (cumul depuis la création)
   - Moyenne de scans par QR-code
   - QR-code le plus performant (nombre de scans et taux de conversion)
   - Nouveaux scans (aujourd’hui / cette semaine / ce mois) avec indicateurs de variation (+10 % / −10 %)
   - Coût par scan (budget dépensé ÷ nombre de scans)

2. **Tendances & graphiques**
   - Courbe journalière des scans (bar + line) sur les 30 derniers jours
   - Heatmap temporelle (jour vs heure) pour repérer les pics d’activité

3. **Géo-insights**
   - Carte interactive avec :
     - Point central (établissement) icône “château”
     - Markers verts (logements actifs) et gris (zones potentielles)
     - Clusters dynamiques pour zones denses
     - Filtre par rayon autour du centre
   - Top 3 secteurs où les QR-codes performent le mieux

4. **Suggestions d’extension**
   - Affichage des zones grises non couvertes sur la carte
   - Pop-up prédictifs : “Ajoutez un code ici pour + 20 % de visibilité” ou “+ 300 scans/semaine”

5. **Alertes & notifications**
   - Toasts en temps réel envoyés à l’utilisateur :
     - + 50 % de scans en 24 h → “Forte activité détectée”
     - Code à 0 scan → “Vérifiez le placement XYZ”

6. **Gestion des placements**
   - Liste paginée et triable des QR-placements (ID, description, adresse, date, scans totaux)
   - Actions rapides : Éditer, Supprimer, Voir sur la carte
   - Bouton “➕ Ajouter un placement” (modal + autocomplete Google)

7. **Objectifs & gamification**
   - Définition d’objectifs mensuels (scans, codes) + barre de progression
   - Badges & pop-ups de réussite (ex. “100 scans atteints”)
   - Suivi de streaks (jours/semaines consécutifs d’activité)

8. **Configuration & support**
   - Profil : compte, langue, fuseau horaire
   - Thème : mode clair / sombre
   - FAQ intégrée & lien vers documentation/API

---------------------------------------------------------------

## Partie 2 : Fonctionnalités pour le staff / administrateurs
1. **Création et personnalisation de QR-codes**
   - Générateur intégré (logo, couleurs, taille, format export)
   - Import/Export en masse (CSV / XLSX) pour gérer des centaines de codes d’un coup

2. **Filtres & segmentation avancés**
   - Filtrer les scans par type d’offre, segment de clientèle, canal de diffusion
   - Segmentation temporelle (week-end vs semaine, haute vs basse saison)

3. **Rapports & exports**
   - Export PDF et CSV des tableaux et graphiques
   - Rapports automatisés programmés (hebdomadaires, mensuels) envoyés par email

4. **Gestion des utilisateurs & des accès**
   - Multi-utilisateurs avec rôles (Admin, Manager, Lecteur)
   - Droits granulaires par module (lecture seule, édition, suppression)

5. **Intégrations externes**
   - Connexion à Google Analytics et autres plateformes (Facebook Ads, etc.)
   - Webhooks / API publique pour push/pull de données

6. **Campagnes & suivi ROI**
   - Lancement et suivi de campagnes de QR-codes (budget, durée, ROI)
   - A/B testing de visuels ou emplacements avec reporting comparatif

7. **Alertes personnalisées & automations**
   - Règles configurables (ex. “alerte si < 5 scans/jour”)
   - Notifications par email, Slack ou push

8. **Prévisions & recommandations avancées**
   - Module ML pour prédire les pics de fréquentation
   - Suggestion dynamique de nouvelles zones à fort potentiel

9. **Audit & historique**
   - Journal d’activité détaillé (qui a fait quoi, quand)
   - Roll-back / restauration d’états antérieurs si nécessaire

10. **Support & formation**
    - Tours guidés et tooltips pour les nouveaux employés
    - Centre de ressources (tutoriels, FAQ avancée, changelog)
