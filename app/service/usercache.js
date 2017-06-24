'use strict';

var util = require('util');

const EXPIRE_TIME = 3 * 60 * 60;

module.exports = app => {
    class UserCacheService extends app.Service {
        _getRedisKey(key) {
            return this.app.config.webadminserv.prefix + key;
        }

        chg2UserCache(ui) {
            let uc = {
                uid: ui.uid,
                username: ui.username,
                nickname: ui.nickname,
                permissions: JSON.stringify(ui.permissions),
                token: ui.token,
                noreadmail: ui.noreadmail
            };

            return uc;
        }

        chg2UserInfo(uc) {
            let ui = {
                uid: uc.uid,
                username: uc.username,
                nickname: uc.nickname,
                permissions: JSON.parse(uc.permissions),
                token: uc.token,
                noreadmail: uc.noreadmail
            };

            return ui;
        }

        // 重设usercache
        * saveUserCache(ui) {
            const uc = this.chg2UserCache(ui);
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
            const uc = yield redisconn.hgetall(rkey);
            yield redisconn.expire(rkey, EXPIRE_TIME);

            // console.log(JSON.stringify(uc));

            return this.chg2UserInfo(uc);
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