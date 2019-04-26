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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","@dojo/framework/shim/array","@dojo/framework/shim/Set","../../core/Error","../../core/object","../../core/promiseUtils","./domains"],function(e,n,i,r,t,l,a,o,u,s,d){function c(e,i){if(null!=e&&null!=i)for(var r=0,t=Array.isArray(e)?e:[e];r<t.length;r++){var l=t[r];if(f(n.rendererFields,l,i),"visualVariables"in l&&l.visualVariables)for(var a=0,o=l.visualVariables;a<o.length;a++){var u=o[a];f(n.visualVariableFields,u,i)}}}function f(e,n,i){if(e)for(var r=0,t=e;r<t.length;r++){var l=t[r],a=u.getDeepValue(l,n),o=a&&"function"!=typeof a&&y(i,a);o&&u.setDeepValue(l,o.name,n)}}function g(e,n){if(null!=e&&null!=n)if("startField"in e){var i=y(n,e.startField),r=y(n,e.endField);e.startField=i&&i.name||null,e.endField=r&&r.name||null}else{var t=y(n,e.startTimeField),l=y(n,e.endTimeField);e.startTimeField=t&&t.name||null,e.endTimeField=l&&l.name||null}}function m(e,n){return e&&n?(Q.clear(),F(Q,e,n),l.from(Q).sort()):[]}function F(e,n,i){if(i)if(n&&n.length)if(l.includes(i,"*"))for(var r=0,t=n;r<t.length;r++){var a=t[r].name;e.add(a)}else for(var o=0,u=i;o<u.length;o++){var s=u[o];p(e,n,s)}else{if(l.includes(i,"*"))return e.clear(),void e.add("*");for(var d=0,c=i;d<c.length;d++){var s=c[d];e.add(s)}}}function p(e,n,i){if(n&&n.length){var r=y(n,i);return void(r&&e.add(r.name))}"string"==typeof i&&e.add(i)}function v(e,n){return n&&e?l.includes(n,"*")?e.map(function(e){return e.name}):n:[]}function h(e,n,i){if(void 0===i&&(i=1),!n||!e)return[];if(l.includes(n,"*"))return["*"];var r=m(e,n);return r.length/e.length>=i?["*"]:r}function y(e,n){if("string"!=typeof n)return null;if(null!=e){n=n.toLowerCase();for(var i=0,r=e;i<r.length;i++){var t=r[i];if(t&&t.name.toLowerCase()===n)return t}}return null}function b(e,n){if(!e||!n||"string"!=typeof n)return!1;n=n.toLowerCase();for(var i=0,r=e;i<r.length;i++){var t=r[i];if(t&&t.name.toLowerCase()===n)return!0}return!1}function I(n,i,l){return t(this,void 0,void 0,function(){var t,a,o,u,d;return r(this,function(r){switch(r.label){case 0:return l?[4,s.create(function(n){e(["../../support/arcadeUtils"],function(e){n(e)})})]:[2];case 1:for(t=r.sent(),a=t.extractFieldNames(l),o=0,u=a;o<u.length;o++)d=u[o],p(n,i,d);return[2]}})})}function T(e){return t(this,void 0,void 0,function(){var n;return r(this,function(i){switch(i.label){case 0:return e?(n=new a.default,[4,V(n,e)]):[2,[]];case 1:return i.sent(),[2,l.from(n).sort()]}})})}function V(e,n){return t(this,void 0,void 0,function(){var i,t;return r(this,function(r){return n?(i=n.fields,t=u.getDeepValue("elevationInfo.featureExpressionInfo",n),t?[2,t.collectRequiredFields(e,i)]:[2]):[2]})})}function N(n,i,l){return t(this,void 0,void 0,function(){var t,a;return r(this,function(r){switch(r.label){case 0:return i&&l&&(l.where&&"1=1"!==l.where||l.timeExtent)?(i.timeInfo&&l.timeExtent&&F(n,i.fields,[i.timeInfo.startField,i.timeInfo.endField]),l.where?[4,s.create(function(n){e(["../../core/sql/WhereClause"],n)})]:[3,2]):[2];case 1:if(t=r.sent(),a=t.create(l.where),!a.isStandardized())return[2,s.reject(new o("fieldUtils:collectFilterFields","Where clause is not standardized"))];F(n,i.fields,a.getFields()),r.label=2;case 2:return[2]}})})}function E(e){return t(this,void 0,void 0,function(){var n;return r(this,function(i){return e?(n="timeInfo"in e&&e.timeInfo,n?[2,m(e.fields,[e.trackIdField,n.startField,n.endField])]:[2,[]]):[2,[]]})})}function w(e){if(!e)return[];var n="editFieldsInfo"in e&&e.editFieldsInfo;return n?m(e.fields,[n&&n.creatorField,n&&n.creationDateField,n&&n.editorField,n&&n.editDateField]):[]}function R(e){if(!e)return[];var n="geometryProperties"in e&&e.geometryProperties;return n?m(e.fields,[n&&n.shapeAreaFieldName,n&&n.shapeLengthFieldName]):[]}function D(e){return t(this,void 0,void 0,function(){var n;return r(this,function(i){switch(i.label){case 0:return e?(n=new a.default,[4,x(n,e)]):[2,[]];case 1:return i.sent(),[2,l.from(n).sort()]}})})}function x(e,n){return t(this,void 0,void 0,function(){var i,t;return r(this,function(r){switch(r.label){case 0:return i=n.labelingInfo,t=n.fields,i&&i.length?[4,s.all(i.map(function(n){return S(e,t,n)}))]:[2];case 1:return r.sent(),[2]}})})}function S(e,n,i){return t(this,void 0,void 0,function(){var t,l,a,o,u;return r(this,function(r){switch(r.label){case 0:return i?(t=i.getLabelExpression(),l=i.where,"arcade"!==t.type?[3,2]:[4,I(e,n,t.expression)]):[2];case 1:return r.sent(),[3,3];case 2:a=t.expression.match(/{[^}]*}/g),a&&a.forEach(function(i){p(e,n,i.slice(1,-1))}),r.label=3;case 3:return o=/['"]+/g,l&&(u=l.split(" "),3===u.length&&p(e,n,u[0].replace(o,"")),7===u.length&&(p(e,n,u[0].replace(o,"")),p(e,n,u[4].replace(o,"")))),[2]}})})}function A(e){var n=e.defaultValue;return void 0!==n&&C(e,n)?n:e.nullable?null:void 0}function _(e){return"number"==typeof e&&!isNaN(e)&&isFinite(e)}function L(e){return null===e||_(e)}function O(e){return null===e||Z(e)}function U(e){return null!=e&&"string"==typeof e}function k(e){return null===e||U(e)}function z(e){return!0}function C(e,n){var i;switch(e.type){case"date":case"integer":case"long":case"small-integer":case"esriFieldTypeDate":case"esriFieldTypeInteger":case"esriFieldTypeLong":case"esriFieldTypeSmallInteger":i=e.nullable?O:Z;break;case"double":case"single":case"esriFieldTypeSingle":case"esriFieldTypeDouble":i=e.nullable?L:_;break;case"string":case"esriFieldTypeString":i=e.nullable?k:U;break;default:i=z}return 1===arguments.length?i:i(n)}function P(e){return null!=e&&$.has(e.type)}function j(e){return null!=e&&("string"===e.type||"esriFieldTypeString"===e.type)}function G(e){return null!=e&&("date"===e.type||"esriFieldTypeDate"===e.type)}function M(e,n){return null===q(e,n)}function H(e){return null==e||"number"==typeof e&&isNaN(e)?null:e}function q(e,n){return e.nullable&&null===n?null:P(e)&&!Y(e.type,n)?ee.OUT_OF_RANGE:C(e,n)?e.domain?d.validateDomainValue(e.domain,n):null:ne.INVALID_TYPE}function Y(e,n){var i="string"==typeof e?W(e):e;return!!i&&(i.isInteger?Z(n)&&n>=i.min&&n<=i.max:n>=i.min&&n<=i.max)}function J(e){var n=d.getDomainRange(e.domain);if(n)return n;if(P(e))return W(e.type)}function W(e){switch(e){case"esriFieldTypeSmallInteger":case"small-integer":return n.smallIntegerRange;case"esriFieldTypeInteger":case"integer":return n.integerRange;case"esriFieldTypeSingle":case"single":return n.singleRange;case"esriFieldTypeDouble":case"double":return n.doubleRange}}function X(e){if(!_(e))return null;if(Z(e)){if(e>=n.smallIntegerRange.min&&e<=n.smallIntegerRange.max)return"esriFieldTypeSmallInteger";if(e>=n.integerRange.min&&e<=n.integerRange.max)return"esriFieldTypeInteger"}return e>=n.singleRange.min&&e<=n.singleRange.max?"esriFieldTypeSingle":"esriFieldTypeDouble"}function B(e,n,i){switch(e){case d.DomainValidationError.INVALID_CODED_VALUE:return"Value "+i+" is not in the coded domain - field: "+n.name+", domain: "+JSON.stringify(n.domain);case d.DomainValidationError.VALUE_OUT_OF_RANGE:return"Value "+i+" is out of the range of valid values - field: "+n.name+", domain: "+JSON.stringify(n.domain);case ne.INVALID_TYPE:return"Value "+i+" is not a valid value for the field type - field: "+n.name+", type: "+n.type+", nullable: "+n.nullable;case ee.OUT_OF_RANGE:var r=W(n.type),t=r.min,l=r.max;return"Value "+i+" is out of range for the number type - field: "+n.name+", type: "+n.type+", value range is "+t+" to "+l}}function K(e,n){if(!n||!n.attributes||!e)return!1;for(var i=n.attributes,r=0,t=e;r<t.length;r++){if(!(t[r]in i))return!1}return!0}Object.defineProperty(n,"__esModule",{value:!0}),n.rendererFields=["field","field2","field3","normalizationField","rotationInfo.field","proportionalSymbolInfo.field","proportionalSymbolInfo.normalizationField","colorInfo.field","colorInfo.normalizationField"],n.visualVariableFields=["field","normalizationField"],n.fixRendererFields=c,n.fixTimeInfoFields=g;var Q=new a.default;n.fixFields=m,n.collectFields=F,n.collectField=p,n.unpackFieldNames=v,n.packFields=h,n.getField=y,n.hasField=b,n.collectArcadeFieldNames=I,n.getElevationFields=T,n.collectElevationFields=V,n.collectFilterFields=N,n.getTimeFields=E,n.getFeatureEditFields=w,n.getFeatureGeometryFields=R,n.getLabelingFields=D,n.collectLabelingFields=x,n.getFieldDefaultValue=A;var Z=function(){return"isInteger"in Number?Number.isInteger:function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e}}();n.isValueMatchingFieldType=C,n.numericTypes=["integer","small-integer","single","double"];var $=new a.default(n.numericTypes.concat(["esriFieldTypeInteger","esriFieldTypeSmallInteger","esriFieldTypeSingle","esriFieldTypeDouble"]));n.isNumericField=P,n.isStringField=j,n.isDateField=G,n.isValidFieldValue=M;var ee;!function(e){e.OUT_OF_RANGE="numeric-range-validation-error::out-of-range"}(ee=n.NumericRangeValidationError||(n.NumericRangeValidationError={}));var ne;!function(e){e.INVALID_TYPE="type-validation-error::invalid-type"}(ne=n.TypeValidationError||(n.TypeValidationError={})),n.sanitizeNullFieldValue=H,n.validateFieldValue=q,n.isNumberInRange=Y,n.getFieldRange=J,n.getNumericTypeForValue=X,n.smallIntegerRange={min:-32768,max:32767,isInteger:!0},n.integerRange={min:-2147483648,max:2147483647,isInteger:!0},n.singleRange={min:-3.4e38,max:1.2e38,isInteger:!1},n.doubleRange={min:-Number.MAX_VALUE,max:Number.MAX_VALUE,isInteger:!1},n.validationErrorToString=B,n.featureHasFields=K});