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

define(["require","exports"],function(e,i){function r(e){if(e)return e.hasOwnProperty("listMode")?e.listMode:void 0}function n(e){if(e)return e.hasOwnProperty("minScale")?e.minScale:void 0}function t(e){if(e)return e.hasOwnProperty("maxScale")?e.maxScale:void 0}function a(e){if(!e)return"inherited";var i=e.get("layer.capabilities.exportMap.supportsSublayerVisibility");if("boolean"==typeof i)return i?"independent":"inherited";var r=e.get("capabilities.exportMap.supportsSublayerVisibility");return"boolean"==typeof r?r?"independent":"inherited":e.hasOwnProperty("visibilityMode")?e.visibilityMode:"independent"}function d(e){if(e){if(!(e.listMode===s.hideChildren||"wmts"===e.type))return"group"===e.type?"layers":"sublayers"}}function o(e){return r(e)!==s.hide}function l(e,i){if(!e||isNaN(i))return!1;var r=n(e),a=t(e),d=!isNaN(r)&&r>0&&i>=r,o=!isNaN(a)&&a>0&&i<=a;return d||o}Object.defineProperty(i,"__esModule",{value:!0});var s={hide:"hide",hideChildren:"hide-children"};i.findLayerListMode=r,i.findLayerMinScale=n,i.findLayerMaxScale=t,i.findLayerVisibilityMode=a,i.getNormalizedChildLayerProperty=d,i.canDisplayLayer=o,i.isLayerOutsideScaleRange=l});