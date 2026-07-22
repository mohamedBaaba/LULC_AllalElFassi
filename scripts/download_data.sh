#!/bin/bash

mkdir -p data/annual_maps


BASE_URL="https://files.sig-maroc.com/LULC_AllalElFassi"


years=(1985 1990 1995 $(seq 2000 2025))

for year in "${years[@]}"; do
    echo "Téléchargement de l'année $year..."
    wget -q --show-progress "${BASE_URL}/reclass_landuse_${year}.tif" -O "data/annual_maps/reclass_landuse_${year}.tif"
done

echo "✅ Tous les fichiers ont été téléchargés !"
