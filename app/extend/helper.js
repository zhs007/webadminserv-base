'use strict';

var { ERRCODE } = require('./errinfo');

module.exports = {
  ERRCODE: ERRCODE,

  buildErrInfo(ec) {
    return {
      errcode: ec,
      strinfo: this.makeStrInfo(ec),
    };
  },

  makeStrInfo(ec) {
    for (let key in ERRCODE) {
      if (ERRCODE[key] == ec) {
        return key;
      }
    }

    return 'EC_UNDEFINED';
  },  

  checkQueryParams(arr) {
    if (arr == undefined || arr.length <= 0) {
      return true;
    }

    for (let i = 0; i < arr.length; ++i) {
      if (!this.ctx.query.hasOwnProperty(arr[i])) {
        return false;
      }
    }

    return true;
  },
};
