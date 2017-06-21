'use strict';

var util = require('util');

const EXPIRE_TIME = 3 * 60 * 60;

module.exports = app => {
    class UserCacheService extends app.Service {
        _getRedisKey(key) {
            return this.app.config.webadminserv.prefix + key;
        }

        // 重设usercache
        * saveUserCache(uc) {
            const redisconn = app.redis;
            const rkey = this._getRedisKey('uc:' + uc.token);
            yield redisconn.hmset(rkey, uc);
            yield redisconn.expire(rkey, EXPIRE_TIME);

            return uc;
        }

        // 获取usercache
        * getUserCache(token) {
            const redisconn = app.redis;
            const rkey = this._getRedisKey('uc:' + token);
            const uc = yield redisconn.hmgetall(rkey);
            yield redisconn.expire(rkey, EXPIRE_TIME);

            return uc;
        }

        // 释放usercache
        * delUserCache(token) {
            const redisconn = app.redis;
            const rkey = this._getRedisKey('uc:' + token);
            const uc = yield redisconn.del(rkey);
        }
    }

    return UserCacheService;
};