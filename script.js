"use strict";

require([
    'esri/Map',
    'esri/views/MapView',
    'esri/widgets/BasemapGallery',
    'esri/widgets/Expand',
    'esri/widgets/Legend',
    'esri/widgets/LayerList',
    'esri/layers/FeatureLayer',
    'esri/widgets/Search',
    'esri/widgets/DistanceMeasurement2D',
    'esri/widgets/ScaleBar',
    'esri/widgets/Home',
    'esri/widgets/Fullscreen'
], (Map, MapView, BasemapGallery, Expand, Legend, LayerList, FeatureLayer, Search, DistanceMeasurement2D, ScaleBar, Home, Fullscreen) => {

    const pop_up = {
        title: "Szczyt",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "Nazwa",
                label: "Nazwa szczytu: "
            },
            {
                fieldName: "Wysokosc",
                label: "Wysokość [m n.p.m]:"
            }],
        }]
      };

    const fl = new FeatureLayer({
        url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/Szczyty_w_Polsce/FeatureServer",
        popupTemplate: pop_up
    });
 
    const map = new Map({
        basemap: "topo-vector"
    });

    map.add(fl);

    const view = new MapView({
        map: map,
        container: "map_div",
        zoom: 7,
        center: [19.5, 49.9]
    });

    let a1 = document.getElementById("a1");
    let a2 = document.getElementById("a2");
    let a3 = document.getElementById("a3");
    let a4 = document.getElementById("a4");
    let a5 = document.getElementById("a5");

    a1.addEventListener('click', function(){
        view.center = [20.088076357798258, 49.17945672310162];
        view.zoom = 15;
    });

    a2.addEventListener('click', function(){
        view.center = [19.52933779908051, 49.57299202603954];
        view.zoom = 15;
    });

    a3.addEventListener('click', function(){
        view.center = [15.73978144048192, 50.73594048876268];
        view.zoom = 15;
    });

    a4.addEventListener('click', function(){
        view.center = [22.726370232942514, 49.074771996419514];
        view.zoom = 15;
    });

    a5.addEventListener('click', function(){
        view.center = [20.11139000242804, 49.54281681275333];
        view.zoom = 15;
    });

    //Legend
    const legendWg = new Legend({
        view: view,
    });

    legendWg.style = {
        type: "card",
        layout: "side-by-side"
      };
     
    /*const expWg0 = new Expand({
        view: view,
        content: legendWg
    }); 
    view.ui.add(expWg0, {position: "bottom-left"}); */

    view.ui.add(legendWg, {position: "bottom-left"});

    //Fullscreen
    const fullscreen = new Fullscreen({
        view: view
    });

    view.ui.add(fullscreen, "top-right");

    //BasemapGallery
    const basemapGalleryWg = new BasemapGallery({
        view: view
    });

    const expWg = new Expand({
        view: view,
        content: basemapGalleryWg
    });

    view.ui.add(expWg, {position: "top-right"});

    //Home
    const homeWg = new Home({
        view: view
    });
      
    view.ui.add(homeWg, "top-left");

    //Search
    const searchWg = new Search({
        view: view,
        includeDefaultSources: false,
        sources: [{
            layer: fl,
            searchFields: ["Nazwa"],
            suggestionTemplate: "{Nazwa}",
            exactMatch: false,
            outFields: ["*"],
            placeholder: "Nazwa szczytu: ",
            name: "Szczyty",
            zoomScale: 100000,
            resultSymbol: pop_up
        }]
    });

    const expWg2 = new Expand({
        view: view,
        content: searchWg
    });

    view.ui.add(expWg2, {position: "top-left"});

    //LayerList
    const layerListWg = new LayerList({
        view: view
    });

    const expWg3 = new Expand({
        view: view,
        content: layerListWg
    });

    view.ui.add(expWg3, {position: "top-left"});

    //Measurement
    const measurementWg = new DistanceMeasurement2D({
        view: view
    });
           
    const expWg4 = new Expand({
        view: view,
        content: measurementWg
    });

    view.ui.add(expWg4, {position: "bottom-right"});

    //ScaleBar
    const scaleBarWg = new ScaleBar({
        view: view,
        unit: "metric",
        style: "ruler"
    });

    view.ui.add(scaleBarWg, {position: "bottom-right"});
});