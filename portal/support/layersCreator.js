// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../core/Collection","../../core/has","../../core/promiseUtils","../../layers/support/lazyLayerLoader","../PortalItem","./mapNotesUtils","./portalLayers","../../renderers/support/styleUtils"],function(e,r,a,t,i,y,n,o,l,L,c,s){function u(e,r,i){return t(this,void 0,void 0,function(){var t;return a(this,function(a){switch(a.label){case 0:return t=new e,t.read(r,i.context),[4,s.loadStyleRenderer(t,i.context)];case 1:return a.sent(),[2,t]}})})}function p(e,r){return t(this,void 0,void 0,function(){var t;return a(this,function(a){switch(a.label){case 0:return[4,S(e,r)];case 1:return t=a.sent(),[2,u(t,e,r)]}})})}function S(e,r){return t(this,void 0,void 0,function(){var t,i,y,n,s,u,p,S;return a(this,function(a){switch(a.label){case 0:return t=r.context,(i=d(t),y=e.layerType||e.type,!y&&r&&r.defaultLayerType&&(y=r.defaultLayerType),n=i[y],s=n?o.layerLookupMap[n]:o.layerLookupMap.UnknownLayer,"Feature Collection"!==e.type)?[3,4]:e.itemId?(u=new l({id:e.itemId,portal:t&&t.portal}),[4,u.load()]):[3,3];case 1:return a.sent(),[4,c.selectLayerClassPath(u)];case 2:p=a.sent(),S=p.className||"UnknownLayer",s=o.layerLookupMap[S],a.label=3;case 3:return[3,5];case 4:"ArcGISFeatureLayer"===y&&L.isMapNotesLayer(e)&&(s=o.layerLookupMap.MapNotesLayer),a.label=5;case 5:return e.wmtsInfo&&(s=o.layerLookupMap.WMTSLayer),[2,s()]}})})}function d(e){var r;switch(e.origin){case"web-scene":switch(e.layerContainerType){case"basemap":r=A;break;case"ground":r=f;break;default:r=g}break;default:switch(e.layerContainerType){case"basemap":r=h;break;default:r=G}}return r}function M(e,r,y){return t(this,void 0,void 0,function(){var t,n,o;return a(this,function(a){switch(a.label){case 0:return t=new i,n=T(t,Array.isArray(r.layers)?r.layers:[],y),[4,e];case 1:return o=a.sent(),[4,n];case 2:return a.sent(),"group"===o.type?(o.layers.addMany(t),[2,o]):[2]}})})}function T(e,r,i){return t(this,void 0,void 0,function(){var t,y,o,l,L,c,s,u,S;return a(this,function(a){switch(a.label){case 0:if(!r)return[2];for(t=[],y=0,o=r;y<o.length;y++)l=o[y],L=p(l,i),"GroupLayer"===l.layerType?t.push(M(L,l,i)):t.push(L);return[4,n.eachAlways(t)];case 1:for(c=a.sent(),s=0,u=c;s<u.length;s++)S=u[s],I&&S.error?console.error(S.error.toString?S.error.toString():S.error):!S.value||i.filter&&!i.filter(S.value)||e.add(S.value);return[2]}})})}function v(e,r,i){return t(this,void 0,void 0,function(){return a(this,function(a){return[2,T(e,r,i)]})})}Object.defineProperty(r,"__esModule",{value:!0});var I=y("dojo-debug-messages"),g={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",PointCloudLayer:"PointCloudLayer",ArcGISSceneServiceLayer:"SceneLayer",IntegratedMeshLayer:"IntegratedMeshLayer",BuildingSceneLayer:"BuildingSceneLayer",ArcGISTiledElevationServiceLayer:"ElevationLayer",ArcGISTiledImageServiceLayer:"TileLayer",ArcGISTiledMapServiceLayer:"TileLayer",GroupLayer:"GroupLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",VectorTileLayer:"VectorTileLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer",KML:"KMLLayer",RasterDataLayer:"UnsupportedLayer"},f={ArcGISTiledElevationServiceLayer:"ElevationLayer",DefaultTileLayer:"ElevationLayer"},A={ArcGISTiledMapServiceLayer:"TileLayer",ArcGISTiledImageServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",WebTiledLayer:"WebTileLayer",VectorTileLayer:"VectorTileLayer",ArcGISImageServiceLayer:"UnsupportedLayer",WMS:"UnsupportedLayer",ArcGISMapServiceLayer:"UnsupportedLayer",DefaultTileLayer:"TileLayer"},G={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"UnsupportedLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISStreamLayer:"StreamLayer",ArcGISTiledImageServiceLayer:"TileLayer",ArcGISTiledMapServiceLayer:"TileLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",GeoRSS:"GeoRSSLayer",KML:"KMLLayer",WMS:"WMSLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",DefaultTileLayer:"TileLayer"},h={ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"UnsupportedLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISTiledImageServiceLayer:"TileLayer",ArcGISTiledMapServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer"};r.createLayer=p,r.populateOperationalLayers=v});