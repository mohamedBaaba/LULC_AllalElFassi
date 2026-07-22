// ============================================================
//IMPORTER LES ÉCHANTILLONS (depuis un asset CSV)

// ============================================================
var trainTable = ee.FeatureCollection('echantillons_train');
var valTable   = ee.FeatureCollection('echantillons_val'); 



print('Nombre d\'échantillons entraînement :', trainTable.size());

// ============================================================
//  ZONE D'ÉTUDE (bbox extraite de votre raster)
// ============================================================
var bbox = ee.Geometry.Rectangle([-5.1751, 33.0317, -4.0707, 33.9563]);

// ============================================================
// IMAGES LANDSAT 2022 
// ============================================================
var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .merge(ee.ImageCollection('LANDSAT/LC09/C02/T1_L2'))
  .filterBounds(bbox)
  .filterDate('2022-01-01', '2022-12-31');

function maskClouds(image) {
  var qa = image.select('QA_PIXEL');
  var cloudBitMask = (1 << 3);
  var shadowBitMask = (1 << 4);
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
    .and(qa.bitwiseAnd(shadowBitMask).eq(0));
  return image.updateMask(mask);
}

var median = collection.map(maskClouds).median().clip(bbox);

// ============================================================
// BANDES SPECTRALES + INDICES
// ============================================================
var spectral = median.select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7']);
var ndvi = median.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
var ndwi = median.normalizedDifference(['SR_B3', 'SR_B6']).rename('NDWI');
var nbr  = median.normalizedDifference(['SR_B5', 'SR_B7']).rename('NBR');

var imageFeatures = spectral
  .addBands(ndvi)
  .addBands(ndwi)
  .addBands(nbr);

// ============================================================
//AJOUT LE MNT ET LA PENTE 
// ============================================================
var dem = ee.Image('NASA/NASADEM_HGT/001').select('elevation').clip(bbox);
var slope = ee.Terrain.slope(dem);
var demSlope = dem.addBands(slope).rename(['DEM', 'SLOPE']);

imageFeatures = imageFeatures.addBands(demSlope);

// ============================================================
// AJOUTER DES TEXTURES SIMPLES
// ============================================================
var nir = imageFeatures.select('SR_B5'); // NIR
// Calcul de la variance dans une fenêtre 5x5
var variance = nir.reduceNeighborhood({
  reducer: ee.Reducer.variance(),
  kernel: ee.Kernel.square(2)
}).rename('VAR');

var entropy = nir.reduceNeighborhood({
  reducer: ee.Reducer.skewness(),
  kernel: ee.Kernel.square(2)
}).rename('SKEW');

imageFeatures = imageFeatures.addBands(variance).addBands(entropy);

print('Bandes finales :', imageFeatures.bandNames());

// ============================================================
//  VALEURS AUX POINTS D'ENTRAÎNEMENT
// ============================================================
// On ajoute les bandes de l'image aux points
var trainPoints = trainTable.map(function(feature) {
  var coords = feature.geometry().coordinates();
  var x = ee.Number(coords.get(0));
  var y = ee.Number(coords.get(1));
  // On extrait les valeurs de l'image à cet emplacement
  var values = imageFeatures.sample(ee.Geometry.Point(x, y), 30).first();
  // On garde la classe
  var cls = feature.get('class');
  return ee.Feature(null, values).set('class', cls);
});

// Filtrer les points qui ont des valeurs 
trainPoints = trainPoints.filter(ee.Filter.notNull(imageFeatures.bandNames()));

print('Points d\'entraînement valides :', trainPoints.size());

// ============================================================
// ENTRAÎNER LE RANDOM FOREST
// ============================================================
var classifier = ee.Classifier.smileRandomForest({
  numberOfTrees: 500,
  variablesPerSplit: null,  // 'sqrt' par défaut
  minLeafPopulation: 1,
  bagFraction: 0.5,
  seed: 42
}).train({
  features: trainPoints,
  classProperty: 'class',
  inputProperties: imageFeatures.bandNames()
});

// ============================================================
// CLASSIFIER L'IMAGE ENTIÈRE
// ============================================================
var classified = imageFeatures.classify(classifier);

// Visualisation (palette adaptée à vos classes)
var palette = ['#1b4f72', '#2e86c1', '#82e0aa', '#f7dc6f', '#a3e4d7', '#f5b041', '#e59866', '#b2babb']; 
// 8 classes -> vous pouvez personnaliser
var vis = {min: 1, max: 9, palette: palette};
Map.addLayer(classified, vis, 'Classification RF');

// ============================================================
// 10. EXPORTER LE RÉSULTAT VERS DRIVE
// ============================================================
Export.image.toDrive({
  image: classified,
  description: 'Classif_RF_AllalElFassi',
  folder: 'GEE_exports',
  fileNamePrefix: 'classification_rf_2022',
  region: bbox,
  scale: 30,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});

