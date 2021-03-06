precision mediump float;

attribute vec2 a_pos;
attribute vec4 a_color;
attribute vec4 a_stroke_color;
attribute vec4 a_data;

const float sizePrecision = 0.25; // 1/4
const float blurPrecision = 0.03125; // 1/32

varying lowp vec4 v_color;
varying lowp vec4 v_stroke_color;
varying mediump float v_blur;
varying mediump float v_stroke_width;
varying mediump float v_radius;
varying mediump vec2 v_offset;

#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif // ID

// the relative transformation of a vertex given in tile coordinates to a relative normalized coordinate
// relative to the tile's upper left corner
// the extrusion vector.
uniform highp mat4 u_transformMatrix;

// the extrude matrix which is responsible for the 'anti-zoom' as well as the rotation
uniform highp mat4 u_extrudeMatrix;

// u_normalized_origin is the tile's upper left corner given in normalized coordinates
uniform highp vec2 u_normalized_origin;

// the z of the layer. Given by the order of the layers in the style
uniform mediump float u_depth;

// the opacity of the layer given by the painter
uniform mediump float u_radius;
uniform lowp vec4 u_color;
uniform mediump float u_blur;
uniform mediump float u_stroke_width;
uniform lowp vec4 u_stroke_color;

uniform mediump float u_antialiasingWidth; // antialiasing (factors in the pixel_ratio for high res devices)

void main()
{
  v_color = a_color * u_color;
  v_stroke_color = a_stroke_color * u_stroke_color;
  v_stroke_width = a_data[1] * sizePrecision * u_stroke_width;
  v_radius = a_data[2] * u_radius;
  v_blur = max(a_data[0] * blurPrecision + u_blur, u_antialiasingWidth / (v_radius + v_stroke_width));

  mediump vec2 offset = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);
  v_offset = offset;

#ifdef ID
  v_id = u_id / 255.0;
#endif // ID

  gl_Position = vec4(u_normalized_origin, u_depth, 0.0) + u_transformMatrix * vec4(a_pos * 0.5, 0.0, 1.0) + u_extrudeMatrix * (v_radius + v_stroke_width) * vec4(offset, 0.0, 0.0);
}
