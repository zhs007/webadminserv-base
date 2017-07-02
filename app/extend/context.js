'use strict';

const { ResultData } = require('./resultdata');
const { UserCache } = require('./usercache');

const RESULTDATA = Symbol('Context#resultdata');
const USERCACHE = Symbol('Context#usercache');

module.exports = {
  get usercache() {
    if (!this[USERCACHE]) {
      this[USERCACHE] = new UserCache(this.app);
    }

    return this[USERCACHE];
  },

  * onStart(isUseToken) {
    // this.set('Access-Control-Allow-Origin', '*');

    // console.log(this.query);
    // console.log(isUseToken);
    if (isUseToken) {
      // console.log('load');
      // console.log(this.usercache);
      if (this.query.hasOwnProperty('token')) {
        yield this.usercache.load(this.query.token);
      }
      else if (this.request.body.hasOwnProperty('token')) {
        yield this.usercache.load(this.request.body.token);
      }
    }
  },

  get resultdata() {
    if (!this[RESULTDATA]) {
      this[RESULTDATA] = new ResultData();
    }

    return this[RESULTDATA];
  },

  * sendResultData(isok, isSaveUserCache) {
    this.body = this.resultdata.end(isok);

    if (isSaveUserCache) {
      yield this.usercache.save();
    }
  },

  setMyUserInfo(ui, isNeedSend) {
    this.usercache.setMyUserInfo(ui);

    if (isNeedSend) {
      this.resultdata.setMyUserInfo(this.usercache.ui);
    }
  },

  * sendErrInfo(ec) {
    this.resultdata.setErrInfo(this.helper.buildErrInfo(ec));
    yield this.sendResultData(false);
  }
};
