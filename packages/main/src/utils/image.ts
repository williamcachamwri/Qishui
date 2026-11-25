// src/utils/image.ts
// @ts-nocheck

function processTemplate(urlObj, pattern, type) {
    const width = pattern?.width ?? 400;
    const height = pattern?.height ?? width ?? 400;
    switch (type) {
      case "crop-center":
        return `${urlObj.template_prefix}-crop-center:${width}:${height}.${pattern?.extname ?? "jpg"}`;
      case "resize":
        return `${urlObj.template_prefix}-resize:${width}:${height}.${pattern?.extname ?? "webp"}`;
      default:
        return `${urlObj.template_prefix}-crop-center:${width}:${height}.${pattern?.extname ?? "jpg"}`;
    }
  }

function getImageUrl(urlObj, pattern, type) {
    if (urlObj && urlObj.uri) {
      const extname = pattern?.extname ?? "jpg";
      const width = pattern?.width ?? 400;
      const height = pattern?.height ?? width ?? 400;
      const imgTemplate = processTemplate(urlObj, pattern, type ?? "crop-center");
      return `${urlObj?.urls?.[0]}${urlObj.uri}~${urlObj.template_prefix ? imgTemplate : `c5_${width}x${height}.${extname}`}`;
    } else if (urlObj?.urls?.[0]) {
      return urlObj.urls[0];
    } else {
      return "";
    }
  }

export {
  getImageUrl
};
