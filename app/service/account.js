'use strict';

var util = require('util');

module.exports = app => {
    class AccountService extends app.Service {
        * login(username, password) {
            const mysqlconn = app.mysql;
            const ret = yield mysqlconn.select('account', {
                where: {username: username, password: password},
                columns: ['uid']
            });

            if (ret.length > 0) {
                const uid = ret[0].uid;

                return {uid: uid, username: username};
            }

            return {uid: -1, username: username};;
        }

        * reg(username, password) {
            const mysqlconn = app.mysql;

            let uid = -1;
            const result = yield mysqlconn.beginTransactionScope(function* (conn) {
                const acsret = yield mysqlconn.select('account', {
                    where: {username: username},
                    columns: ['uid']
                });

                if (acsret.length > 0) {
                    return {uid: -1, username: username};
                }

                const uiret = yield mysqlconn.insert('uidinfo', {});
                uid = uiret.insertId;
                const acret = yield mysqlconn.insert('account', {uid: uid, username: username, password: password});
                const ubret = yield mysqlconn.insert('userbase', {uid: uid});
                return {uid: uid, username: username};
            }, this.ctx);

            return result;
        }
    }
    return AccountService;
};