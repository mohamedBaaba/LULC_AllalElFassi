# 🌍 LULC_AllalElFassi (1985–2025)

[![Licence](https://img.shields.io/badge/License-CC_BY_4.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Data](https://img.shields.io/badge/Data-Cloudflare_R2-orange)](https://files.sig-maroc.com/LULC_AllalElFassi/)
[![GEE](https://img.shields.io/badge/Made_with-Google_Earth_Engine-green)](https://earthengine.google.com/)

**Land Use / Land Cover (LULC) time series dataset (30 m resolution) for the Allal El Fassi watershed, Morocco, covering 1985 to 2025.**

---

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
