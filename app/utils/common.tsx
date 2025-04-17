import {BaseRegionCountry} from '@medusajs/types/dist/http/region/common';

const utils = {
  areEqualObjects: (
    o1?: Record<string, any>,
    o2?: Record<string, any>,
  ): boolean => {
    if (!o1 || !o2) {
      return false;
    }
    for (const p in o1) {
      if (o1.hasOwnProperty(p)) {
        if (o1[p] !== o2[p]) {
          return false;
        }
      }
    }
    for (const p in o2) {
      if (o2.hasOwnProperty(p)) {
        if (o1[p] !== o2[p]) {
          return false;
        }
      }
    }
    return Object.keys(o1).length === Object.keys(o2).length;
  },
  getCountryName: (
    countryCode?: string,
    countries?: BaseRegionCountry[],
  ) => {
    if (!countryCode || !countries) {
      return '';
    }
    const country = countries.find(c => c.iso_2 === countryCode);
    return country?.display_name || countryCode.toUpperCase();
  },
};

export default utils;
