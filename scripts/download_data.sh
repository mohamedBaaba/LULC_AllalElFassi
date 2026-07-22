#!/bin/bash

# Créer le dossier s'il n'existe pas
mkdir -p data/annual_maps

# URL de base de votre Cloudflare R2 (corrigée)
BASE_URL="https://files.sig-maroc.com/LULC_AllalElFassi"

# Années : 1985, 1990, 1995 + TOUTES les années de 2000 à 2025
years=(1985 1990 1995 $(seq 2000 2025))

for year in "${years[@]}"; do
    echo "Téléchargement de l'année $year..."
    wget -q --show-progress "${BASE_URL}/reclass_landuse_${year}.tif" -O "data/annual_maps/reclass_landuse_${year}.tif"
done

echo "✅ Tous les fichiers ont été téléchargés !"
