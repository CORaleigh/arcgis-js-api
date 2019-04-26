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

define(["require","exports","../../../../../core/has","../../../support/mathUtils"],function(_,T,E,R){Object.defineProperty(T,"__esModule",{value:!0}),T.forceVerticalModifier=E("mac")?"Meta":"Control",T.forceHorizontalModifier="Shift",T.DISPLAY_FOCUS_MULTIPLIER=2,T.ARROW_RADIUS_FOCUS_MULTIPLIER=1.4,T.SHIFT_RESTART_TUBE_FOCUS_MULTIPLIER=1.15,T.SHIFT_RESTART_TIP_FOCUS_MULTIPLIER=1.15,T.ROTATE_HEADING_DISC_RADIUS_FOCUS_MULTIPLIER=1.1,T.ROTATE_HEADING_TUBE_FOCUS_MULTIPLIER=1.1,T.ROTATE_HEADING_TIP_FOCUS_MULTIPLIER=1.05,T.MOUSE_INPUT_FOCUS_MULTIPLIER=2,T.TOUCH_INPUT_FOCUS_MULTIPLIER=5,T.POINTER_MOVE_TIMER_MS=2500,T.INITIAL_DEPTH_OFFSET_FRAC=.02,T.VERTICAL_DOT_THRESHOLD=Math.cos(R.deg2rad(45)),T.PREVIEW_FADE_DOT_THRESHOLD=.95,T.PREVIEW_FADE_DURATION_SECONDS=.3,T.HANDLE_OPACITY=.7,T.HANDLE_COLOR=[1,.5,0],T.PLANE_OUTLINE_WIDTH=2,T.PLANE_OUTLINE_COLOR=T.HANDLE_COLOR.concat([T.HANDLE_OPACITY]),T.PLANE_BACKGROUND_COLOR=[0,0,0,.04],T.GRID_COLOR=T.HANDLE_COLOR.concat([.5]),T.ROTATE_HEADING_ARROW_COLOR=[1,1,1,1],T.ROTATE_HEADING_CALLOUT_COLOR=T.HANDLE_COLOR.concat([1]),T.ROTATE_HEADING_DISC_COLOR=T.HANDLE_COLOR.concat([.5]),T.SHIFT_RESTART_ARROW_TIP_COLOR=[1,1,1,1],T.SHIFT_RESTART_ARROW_CAP_COLOR=[1,.8,.6,1],T.SHIFT_RESTART_TUBE_COLOR=[1,.93,.86,1],T.SHIFT_RESTART_CALLOUT_COLOR=T.HANDLE_COLOR.concat([1]),T.SHIFT_RESTART_OUTLINE_COLOR=T.HANDLE_COLOR.concat([1]),T.SHIFT_RESTART_TUBE_RADIUS=3,T.SHIFT_RESTART_TIP_RADIUS=11,T.SHIFT_RESTART_TIP_LENGTH=22.5,T.SHIFT_RESTART_OFFSET_DISTANCE=40,T.SHIFT_RESTART_ARROW_LENGTH=48,T.SHIFT_RESTART_ARROW_OUTLINE_WIDTH=2.25,T.RESIZE_HANDLE_CORNER_WIDTH=4,T.RESIZE_HANDLE_EDGE_WIDTH=1,T.RESIZE_HANDLE_EDGE_PADDING_FRAC=.3,T.RESIZE_HANDLE_INPUT_RADIUS=4,T.ROTATE_HEADING_TUBE_RADIUS=2.6,T.ROTATE_HEADING_TIP_RADIUS=7.5,T.ROTATE_HEADING_TIP_LENGTH=12,T.ROTATE_HEADING_OFFSET_DISTANCE=40,T.ROTATE_HEADING_DISC_RADIUS=27,T.ROTATE_HEADING_DISC_ARROW_RADIUS=15;var I=R.deg2rad(45);T.PERPENDICULAR_GROUND_DOT_THRESHOLD=Math.cos(I),T.PLANE_MIN_BASIS_SCREEN_LEN2=1600,T.SHIFT_MIN_BASIS_SCREEN_LEN2=1600,T.ROTATE_MIN_BASIS_SCREEN_LEN2=1600,T.INITIAL_PLANE_HALF_SIZE_VIEW_PROPORTION=.4});