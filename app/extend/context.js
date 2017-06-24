'use strict';

const { ResultData } = require('./resultdata');
const { UserCache } = require('./usercache');

const RESULTDATA = Symbol('Context#resultdata');
const USERCACHE = Symbol('Context#usercache');

module.exports = {
  get usercache() {
    if (!this[RESULTDATA]) {
      this[RESULTDATA] = new UserCache(this.app);
    }

    return this[RESULTDATA];
  },

  onStart(isUseToken) {
    this.set('Access-Control-Allow-Origin', '*');

    if (isUseToken && this.query.hasOwnProperty('token')) {
      this.usercache.load(this.query.token);
    }
  },

  get resultdata() {
    if (!this[RESULTDATA]) {
      this[RESULTDATA] = new ResultData();
    }

    return this[RESULTDATA];
  },

  sendResultData(isok, isSaveUserCache) {
    this.body = this.resultdata.end(isok);

    if (isSaveUserCache) {
      this.usercache.save();
    }
  },

  setMyUserInfo(ui, isNeedSend) {
    this.usercache.setMyUserInfo(ui);

    if (isNeedSend) {
      this.resultdata.setMyUserInfo(this.usercache.ui);
    }
  },

  sendErrInfo(ec) {
    this.resultdata.setErrInfo(this.helper.buildErrInfo(ec));
    this.sendResultData(false);
  }
};
