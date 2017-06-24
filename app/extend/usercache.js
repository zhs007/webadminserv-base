'use strict';

const JSONOBJ_NAME = ['permissions'];

class UserCache {
  constructor(app) {
    this.app = app;

    this.ui = { uid: -1 };
  }

  isValid() {
    return this.ui.uid > 0;
  }

  _isJsonObj(key) {
  }

  setMyUserInfo(ui) {
    for (let key in ui) {
      this.ui[key] = ui[key];
    }
  }

  _getRedisKey(key) {
    return this.app.config.webadminserv.prefix + key;
  }

  _chg2UserCache() {
    let uc = {};
    for (let key in this.ui) {
      if (this._isJsonObj(key)) {
        uc[key] = JSON.stringify(this.ui[key]);
      }
      else {
        uc[key] = this.ui[key];
      }
    }

    return uc;
  }

  _parse(uc) {
    for (let key in uc) {
      if (this._isJsonObj(key)) {
        this.ui[key] = JSON.stringify(uc[key]);
      }
      else {
        this.ui[key] = uc[key];
      }
    }

    if (this.ui.uid <= 0) {
      this.ui = { uid: -1 };
    }
  }

  // 重设usercache
  * save() {
    if (this.ui.uid <= 0) {
      return;
    }

    const uc = this._chg2UserCache();
    const redisconn = app.redis;
    const rkey = this._getRedisKey('uc:' + uc.token);
    yield redisconn.hmset(rkey, uc);
    yield redisconn.expire(rkey, EXPIRE_TIME);
  }

  // 获取usercache
  * load(token) {
    const redisconn = app.redis;
    const rkey = this._getRedisKey('uc:' + token);
    const uc = yield redisconn.hgetall(rkey);
    yield redisconn.expire(rkey, EXPIRE_TIME);

    _parse(uc);
  }

  // 释放usercache
  * del(token) {
    const redisconn = app.redis;
    const rkey = this._getRedisKey('uc:' + token);
    const uc = yield redisconn.del(rkey);

    this.ui = { uid: -1 };
  }
};

module.exports = {
  UserCache: UserCache
};
