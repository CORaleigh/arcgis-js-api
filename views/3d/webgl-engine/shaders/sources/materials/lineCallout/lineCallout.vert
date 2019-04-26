#include <util/vsPrecision.glsl>
#include <util/alignPixel.glsl>
#include <util/hud.glsl>
#include <util/slice.glsl>

attribute vec2 uv0;

uniform float lineSize;
uniform vec2 pixelToNDC;
uniform float borderSize;
uniform vec2 screenOffset;

varying vec4 coverageSampling;
varying vec2 lineSizes;

void main(void) {

  ProjectHUDAux projectAux;
  vec4 endPoint = projectPositionHUD(projectAux);

  vec3 vpos = projectAux.posModel;
  if (rejectBySlice(vpos)) {
    gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    return;
  }

#ifdef OCCL_TEST
  if (!testVisibilityHUD(endPoint)) {
    gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    return;
  }
#endif

#ifdef SCREEN_SIZE_PERSPECTIVE
  vec4 perspectiveFactor = screenSizePerspectiveScaleFactor(projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);
  vec2 screenOffsetScaled = applyScreenSizePerspectiveScaleFactorVec2(screenOffset, perspectiveFactor);
#else
  vec2 screenOffsetScaled = screenOffset;
#endif

  // Add view dependent polygon offset to get exact same original starting point. This is mostly
  // used to get the correct depth value
  vec3 posView = (view * (model * vec4(position, 1.0))).xyz;
  applyHUDViewDependentPolygonOffset(auxpos1.w, projectAux.absCosAngle, posView);

  vec4 startPoint = proj * vec4(posView, 1.0);

  // Apply screen offset to both start and end point
  vec2 screenOffsetNorm = screenOffsetScaled * 2.0 / viewport.zw;

  startPoint.xy += screenOffsetNorm * startPoint.w;
  endPoint.xy += screenOffsetNorm * endPoint.w;

  // Align start and end to pixel origin
  vec4 startAligned = alignToPixelOrigin(startPoint, viewport.zw);
  vec4 endAligned = alignToPixelOrigin(endPoint, viewport.zw);

#ifdef DEPTH_HUD

#ifdef DEPTH_HUD_ALIGN_START
  endAligned = vec4(endAligned.xy / endAligned.w * startAligned.w, startAligned.zw);
#else
  startAligned = vec4(startAligned.xy / startAligned.w * endAligned.w, endAligned.zw);
#endif

#endif

  vec4 projectedPosition = mix(startAligned, endAligned, uv0.y);

  // The direction of the line in screen space
  vec2 screenSpaceDirection = normalize(endAligned.xy / endAligned.w - startAligned.xy / startAligned.w);
  vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x);

#ifdef SCREEN_SIZE_PERSPECTIVE

  float lineSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(lineSize, perspectiveFactor);
  float borderSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(borderSize, perspectiveFactor);

#else

  float lineSizeScaled = lineSize;
  float borderSizeScaled = borderSize;

#endif

  float halfPixelSize = lineSizeScaled * 0.5;
  // Calculate a pixel offset from the edge of the pixel, s.t. we keep the line aligned
  // to pixels if it has a full pixel size. Since pixel aligned biases to the bottom-left,
  // we bias the size to the right (for odd sizes) to balance out the bias. Grow sub-pixel
  // sizes towards the left or right s.t. there is a smooth transition (e.g. from 2 to 3 px).
  float halfWholePixelSize = floor(lineSizeScaled) * 0.5;
  float halfPixelSizeInt = floor(halfWholePixelSize);

  // Sub-pixel offset if we need to grow sub-pixels to the left
  float subpixelOffset = -fract(lineSizeScaled) * float(halfWholePixelSize > 0.0);

  // Pixel offset aligning to whole pixels and adding subpixel offset if needed
  float pixelOffset = -halfPixelSizeInt + subpixelOffset;

  // Compute full ndc offset, adding 1px padding for doing anti-aliasing and the border size
  float padding = 1.0 + borderSizeScaled;
  vec2 ndcOffset = (pixelOffset - padding + uv0.x * (lineSizeScaled + padding + padding)) * pixelToNDC;

  // Offset x/y from the center of the line in screen space
  projectedPosition.xy += perpendicularScreenSpaceDirection * ndcOffset * projectedPosition.w;

  // Compute a coverage varying which we can use in the fragment shader to determine
  // how much a pixel is actually covered by the line (i.e. to anti alias the line).
  // This works by computing two coordinates that can be linearly interpolated and then
  // subtracted to find out how far away from the line edge we are.
  float edgeDirection = (uv0.x * 2.0 - 1.0);

  float halfBorderSize = 0.5 * borderSizeScaled;
  float halfPixelSizeAndBorder = halfPixelSize + halfBorderSize;
  float outerEdgeCoverageSampler = edgeDirection * (halfPixelSizeAndBorder + halfBorderSize + 1.0);

  float isOneSided = float(lineSizeScaled < 2.0 && borderSize < 2.0);

  coverageSampling = vec4(
    // Edge coordinate
    outerEdgeCoverageSampler,

    // Border edge coordinate
    outerEdgeCoverageSampler - halfPixelSizeAndBorder * isOneSided,

    // Line offset
    halfPixelSize - 0.5,

    // Border offset
    halfBorderSize - 0.5 + halfPixelSizeAndBorder * (1.0 - isOneSided)
  );

  lineSizes = vec2(lineSizeScaled, borderSizeScaled);

  gl_Position = projectedPosition;
}
