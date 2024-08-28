var newBoundingBoxes = [
    {left: -62.93410650116526, right: -62.88811275861834, top: -0.7161941039466533, bottom: -0.7621878464935727, name: 31},
    {left: -62.93410650116526, right: -62.88811275861834, top: -0.7564386286752078, bottom: -0.8024323712221273, name: 32},
    {left: -62.93410650116526, right: -62.88811275861834, top: -0.5782128763058947, bottom: -0.6242066188528141, name: 33},
    {left: -62.896736585345884, right: -62.850742842798965, top: -0.5322191337589752, bottom: -0.5782128763058947, name: 34},
    {left: -62.896736585345884, right: -62.850742842798965, top: -0.6242066188528143, bottom: -0.6702003613997337, name: 35},
    {left: -62.896736585345884, right: -62.850742842798965, top: -0.5782128763058947, bottom: -0.6242066188528141, name: 36},
    {left: -63.16407521389986, right: -63.11808147135294, top: -0.5322191337589752, bottom: -0.5782128763058947, name: 37},
    {left: -63.16407521389986, right: -63.11808147135294, top: -0.6242066188528143, bottom: -0.6702003613997337, name: 38},
    {left: -63.16407521389986, right: -63.11808147135294, top: -0.6702003613997337, bottom: -0.7161941039466532, name: 39},
    {left: -63.16407521389986, right: -63.11808147135294, top: -0.7161941039466533, bottom: -0.7621878464935727, name: 40},
    {left: -63.16407521389986, right: -63.11808147135294, top: -0.7564386286752078, bottom: -0.8024323712221273, name: 41},
    {left: -63.16407521389986, right: -63.11808147135294, top: -0.5782128763058947, bottom: -0.6242066188528141, name: 42},
    {left: -66.89537323414143, right: -66.8493794915945, top: 1.2956302672865796, bottom: 1.2496365247396601, name: 43},
    {left: -66.89537323414143, right: -66.8493794915945, top: 1.2036427821927407, bottom: 1.1576490396458212, name: 44},
    {left: -66.89537323414143, right: -66.8493794915945, top: 1.157649039645821, bottom: 1.1116552970989015, name: 45},
    {left: -66.89537323414143, right: -66.8493794915945, top: 1.1116552970989015, bottom: 1.065661554551982, name: 46},
    {left: -66.89537323414143, right: -66.8493794915945, top: 1.071410772370347, bottom: 1.0254170298234275, name: 47},
    {left: -66.89537323414143, right: -66.8493794915945, top: 1.2496365247396601, bottom: 1.2036427821927407, name: 48},
    {left: -66.84937949159452, right: -66.80338574904759, top: 1.2036427821927407, bottom: 1.1576490396458212, name: 49},
    {left: -66.84937949159452, right: -66.80338574904759, top: 1.1116552970989015, bottom: 1.065661554551982, name: 50},
    {left: -66.84937949159452, right: -66.80338574904759, top: 1.071410772370347, bottom: 1.0254170298234275, name: 51},
    {left: -66.84937949159452, right: -66.80338574904759, top: 1.2496365247396601, bottom: 1.2036427821927407, name: 52},
    {left: -68.94673277426239, right: -68.90073903171546, top: -3.3578812743061506, bottom: -3.4038750168530703, name: 53},
    {left: -68.94673277426239, right: -68.90073903171546, top: -3.4038750168530703, bottom: -3.44986875939999, name: 54},
    {left: -68.94673277426239, right: -68.90073903171546, top: -3.4498687593999895, bottom: -3.495862501946909, name: 55},
    {left: -68.85474528916855, right: -68.80875154662162, top: -3.3578812743061506, bottom: -3.4038750168530703, name: 56},
    {left: -68.85474528916855, right: -68.80875154662162, top: -3.4038750168530703, bottom: -3.44986875939999, name: 57},
    {left: -68.85474528916855, right: -68.80875154662162, top: -3.4498687593999895, bottom: -3.495862501946909, name: 58},
    {left: -68.85474528916855, right: -68.80875154662162, top: -3.4901132841285443, bottom: -3.536107026675464, name: 59},
    {left: -68.80875154662162, right: -68.7627578040747, top: -3.3578812743061506, bottom: -3.4038750168530703, name: 60}
  ];
  
  
// Define the start and end date for the image collection
var startDate = '2023-01-01';
var endDate = '2023-12-31';

// Function to generate NDWI binary mask for a bounding box
function generateNDWIBinaryMask(bbox) {
  var region = ee.Geometry.Rectangle([bbox.left, bbox.bottom, bbox.right, bbox.top]);

  // Load Sentinel-2 data
  var sentinelImageCollection = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
                    .filterBounds(region)
                    .filterDate(startDate, endDate);

  // Select the image with the smallest cloudy pixel percentage
  var sentinelImage = sentinelImageCollection
                      .sort('CLOUDY_PIXEL_PERCENTAGE')
                      .first()
                      .clip(region);

  // Calculate NDWI
  var ndwi = sentinelImage.normalizedDifference(['B3', 'B8']).rename('NDWI');

  // Create NDWI mask (binary mask with threshold 0)
  var ndwiMask = ndwi.gte(-0.25).selfMask();

  // Return the NDWI mask and the region
  return {name: bbox.name, ndwiMask: ndwiMask, region: region};
}

// Loop through the bounding boxes and get the NDWI binary masks
var ndwiMasks = boundingBoxes.map(function(bbox) {
  return generateNDWIBinaryMask(bbox);
});

// Add the NDWI binary masks to the map
ndwiMasks.forEach(function(item) {
  Map.addLayer(item.ndwiMask, {palette: ['white', 'blue']}, 'NDWI Mask ' + item.name);
});

// Center the map on the first region for visualization
Map.centerObject(ndwiMasks[0].region, 14);