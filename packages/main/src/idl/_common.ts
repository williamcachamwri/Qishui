// src/idl/_common.ts
// @ts-nocheck

function mergeRequestData(data) {
    return {
      params: Object.assign({}, ...data.map((d2) => d2.params)),
      query: Object.assign({}, ...data.map((d2) => d2.query)),
      body: Object.assign({}, ...data.map((d2) => d2.body))
    };
  }

function isNil(item) {
    return item === void 0 || item === null;
  }

function fieldsAssign(src2, fields) {
    const dst = {};
    for (const key of fields) {
      if (Array.isArray(key)) {
        const [dstKey, srcKey] = key;
        if (!isNil(src2[srcKey])) {
          dst[dstKey] = src2[srcKey];
        }
      } else {
        if (!isNil(src2[key])) {
          dst[key] = src2[key];
        }
      }
    }
    return dst;
  }

export {
  fieldsAssign,
  mergeRequestData
};
