'use strict';

const JSONOBJ_NAME = ['permissions'];
const EXPIRE_TIME = 3 * 60 * 60;

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
    // console.log('setmyuserinfo' + JSON.stringify(ui));
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
    // console.log('save' + JSON.stringify(uc));
    const redisconn = this.app.redis;
    const rkey = this._getRedisKey('uc:' + uc.token);
    yield redisconn.hmset(rkey, uc);
    yield redisconn.expire(rkey, EXPIRE_TIME);
  }

  // 获取usercache
  * load(token) {
    // console.log(token);
    const redisconn = this.app.redis;
    const rkey = this._getRedisKey('uc:' + token);
    const uc = yield redisconn.hgetall(rkey);
    yield redisconn.expire(rkey, EXPIRE_TIME);

    // console.log(uc);
    this._parse(uc);
  }

  // 释放usercache
  * del(token) {
    const redisconn = this.app.redis;
    const rkey = this._getRedisKey('uc:' + token);
    const uc = yield redisconn.del(rkey);

    this.ui = { uid: -1 };
  }
};

module.exports = {
  UserCache: UserCache
};
