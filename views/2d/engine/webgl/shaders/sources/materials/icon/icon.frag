precision mediump float;

#include <materials/constants.glsl>
#include <materials/utils.glsl>
#include <util/encoding.glsl>
#include <materials/effects.glsl>
#include <materials/constants.glsl>

uniform lowp sampler2D u_texture;

varying lowp vec2 v_tex;
varying lowp float v_transparency;
varying mediump vec2 v_size;
varying lowp vec4 v_color;
varying float v_visible;

#ifdef SDF
varying lowp vec4 v_outlineColor;
varying mediump float v_outlineWidth;
varying float v_overridingOutlineColor;
#endif // SDF

#ifdef HIGHLIGHT
varying float v_isThinGeometry;
#endif // HIGHLIGHT

#ifdef ID
varying highp vec4 v_id;
#endif // ID

void main()
{
#ifdef SDF
  lowp vec4 fillPixelColor = v_color;

  // calculate the distance from the edge [-0.5, 0.5]
  float d = 0.5 - rgba2float(texture2D(u_texture, v_tex));

  // the soft edge ratio is about 1.5 pixels allocated for the soft edge.
  float size = max(v_size.x, v_size.y);
  float dist = d * size * SOFT_EDGE_RATIO;

  // set the fragment's transparency according to the distance from the edge
  fillPixelColor *= clamp(0.5 - dist, 0.0, 1.0);

  float outlineWidth = v_outlineWidth;

  #ifdef HIGHLIGHT
    outlineWidth = max(outlineWidth, 4.0 * v_isThinGeometry);
  #endif

  // count for the outline
  // therefore tint the entire icon area.
  if (outlineWidth > 0.25) {
    lowp vec4 outlinePixelColor = v_overridingOutlineColor * v_color + (1.0 - v_overridingOutlineColor) * v_outlineColor;

    // outlines can't be larger than the size of the symbol
    float clampedOutlineSize = min(outlineWidth, size);

    outlinePixelColor *= clamp(0.5 - abs(dist) + clampedOutlineSize * 0.5, 0.0, 1.0);

    // finally combine the outline and the fill colors (outline draws on top of fill)
    gl_FragColor = v_transparency * ((1.0 - outlinePixelColor.a) * fillPixelColor + outlinePixelColor);
  }
  else {
    gl_FragColor = v_transparency * fillPixelColor;
  }
#else // not an SDF
   lowp vec4 texColor = texture2D(u_texture, v_tex);
   gl_FragColor = v_transparency * getEffectColor(texColor, v_visible);
#endif // SDF

#ifdef HIGHLIGHT
  gl_FragColor.a = step(1.0 / 255.0, gl_FragColor.a);
#endif // HIGHLIGHT

#ifdef ID
  if (gl_FragColor.a < 1.0 / 255.0) {
    discard;
  }
  gl_FragColor = v_id;
#endif // ID
}
