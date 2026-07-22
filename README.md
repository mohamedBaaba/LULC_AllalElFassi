# 🌍 LULC_AllalElFassi (1985–2025)

[![Licence](https://img.shields.io/badge/License-CC_BY_4.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Data](https://img.shields.io/badge/Data-Cloudflare_R2-orange)](https://files.sig-maroc.com/LULC_AllalElFassi/)
[![GEE](https://img.shields.io/badge/Made_with-Google_Earth_Engine-green)](https://earthengine.google.com/)

**Land Use / Land Cover (LULC) time series dataset (30 m resolution) for the Allal El Fassi watershed, Morocco, covering 1985 to 2025.**

---
## 📄 Associated Publication

This dataset accompanies the following research article:

**Bensouda Mourri, O., Baaba, M., Ouallal, A., Khazaza, A., Lakhili, F., El Amarty, F., & Benaabidate, L.** (2026). *Development of a 30-m Spatiotemporal Land Use/Land Cover Dataset (1985–2025) for the Allal El Fassi Watershed (Morocco) Using Landsat Time Series and Google Earth Engine*. [Journal Name – à ajouter quand il sera publié]

When using this dataset, please cite both:
1. This dataset (as above)
2. The associated research article

---

### Authors Affiliation

- **Otmane Bensouda Mourri** : Laboratory of Geo-Resources and Environment (LGRE), FST-Fes, Sidi Mohammed Ben Abdellah University, Morocco / National Agency for Water and Forests (ANEF), Morocco.
- **Mohamed Baaba** : National Agency for Water and Forests (ANEF), Morocco.
- **Abdelkarim Ouallal** : National Agency for Water and Forests (ANEF), Morocco.
- **Ayyoub Khazaza** : Functional Ecology and Environmental Engineering Laboratory (LEFGE), FST-Fes, Morocco / National Agency for Water and Forests (ANEF), Morocco.
- **Ferdaouss Lakhili** : Laboratory of Intelligent Systems, Energy, and Sustainable Development (SIEDD), Private University of Fez, Morocco.
- **Fahed El Amarty** : Laboratory of Geo-Resources and Environment (LGRE), FST-Fes, Morocco / Laboratory of Intelligent Systems, Energy, and Sustainable Development (SIEDD), Private University of Fez, Morocco.
- **Lahcen Benaabidate** : Laboratory of Geo-Resources and Environment (LGRE), FST-Fes, Sidi Mohammed Ben Abdellah University, Morocco.
## 📖 Description

This dataset comprises **29 annual land cover maps** produced from the Landsat archive (TM, ETM+, OLI, OLI-2) using Google Earth Engine. It combines the **CCDC** (Continuous Change Detection and Classification) algorithm with a **Random Forest** classifier.

- **Spatial Resolution** : 30 meters
- **Coordinate System** : WGS84 / UTM Zone 30N (EPSG:32630)
- **Format** : GeoTIFF
- **Overall Accuracy** : 82.82%

---

## 🗺 Land Cover Classes

| Code | Class |
|------|-------|
| 1    | Dense forest |
| 2    | Open forest |
| 3    | Shrubland / Maquis |
| 4    | Cropland |
| 5    | Bare soil / Sparse vegetation |
| 6    | Water bodies |
| 7    | Built-up areas |
| 8    | Snow / Clouds / No data |

---

## 📦 Data Download (Raster Files)

⚠️ The annual raster files (`.tif`) are large and hosted on **Cloudflare R2**. They are **not stored on GitHub** to keep the repository lightweight.

To download all the rasters automatically, simply run the following command in your terminal (Linux, Mac, or Git Bash on Windows) :

```bash
bash scripts/download_data.sh
