'use strict';

var { ERRCODE, buildErrInfo } = require('./errinfo');

module.exports = {
  ERRCODE: ERRCODE,

  buildErrInfo: buildErrInfo,

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
