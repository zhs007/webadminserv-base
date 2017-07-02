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

  checkRequestBodyParams(arr) {
    if (arr == undefined || arr.length <= 0) {
      return true;
    }

    for (let i = 0; i < arr.length; ++i) {
      if (!this.ctx.request.body.hasOwnProperty(arr[i])) {
        return false;
      }
    }

    return true;
  },

  checkRequestParams(arr) {
    if (arr == undefined || arr.length <= 0) {
      return true;
    }

    for (let i = 0; i < arr.length; ++i) {
      let hascur = false;

      if (this.ctx.query.hasOwnProperty(arr[i])) {
        hascur = true;
      }
      else if (this.ctx.request.body.hasOwnProperty(arr[i])) {
        hascur = true;
      }

      if (!hascur) {
        return false;
      }
    }

    return true;
  },

  getRequestParam(name) {
    if (this.ctx.query.hasOwnProperty(name)) {
      return this.ctx.query[name];
    }
    if (this.ctx.request.body.hasOwnProperty(name)) {
      return this.ctx.request.body[name];
    }

    return undefined;
  }  
};
