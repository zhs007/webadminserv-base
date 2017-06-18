'use strict';

var util = require('util');

const TOKENSTR = 'abcdefghijklmn0123456789';
const TOKEN_LEN = 32;

function generateToken() {
    let token = '';
    const strlen = TOKENSTR.length;

    for (let i = 0; i < TOKEN_LEN; ++i) {
        const curci = Math.floor(Math.random() * strlen);
        token += TOKENSTR.charAt(curci);
    }

    return token;
}

module.exports = app => {
    class AccountService extends app.Service {
        // 内部调用函数，如果uid有值且大于0，则更新表再返回
        * _generateToken(mysqlconn, uid) {
            do {
                const token = generateToken();
                const acsret = yield mysqlconn.select('userbase', {
                    where: {token: token},
                    columns: ['uid']
                });

                if (acsret.length <= 0) {
                    if (uid != undefined && uid > 0) {
                        const result = yield app.mysql.update('userbase', {
                            token: token
                        }, {
                            where: {uid: uid},
                            columns: ['token']
                        });

                        if (result.affectedRows === 1) {
                            return token;
                        }
                    }
                    else {
                        return token;
                    }
                }

            } while (true);
        }

        * login(username, password) {
            const mysqlconn = app.mysql;
            const ret = yield mysqlconn.select('account', {
                where: {username: username, password: password},
                columns: ['uid']
            });

            if (ret.length > 0) {
                const uid = ret[0].uid;
                const token = yield this._generateToken(mysqlconn, uid);

                return {uid: uid, username: username, token: token};
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
                
                const token = yield this._generateToken(mysqlconn);

                const uiret = yield mysqlconn.insert('uidinfo', {});

                uid = uiret.insertId;

                const acret = yield mysqlconn.insert('account', {
                    uid: uid, 
                    username: username, 
                    password: password});

                const ubret = yield mysqlconn.insert('userbase', {
                    uid: uid, 
                    token: token});

                return {
                    uid: uid, 
                    username: username,
                    token: token
                };
            }, this.ctx);

            return result;
        }

        * queryWithToken(token) {
            console.log(token);
            const mysqlconn = app.mysql;

            const ubret = yield mysqlconn.select('userbase', {
                where: {token: token},
                columns: ['uid']
            });

            if (ubret.length <= 0) {
                return {uid: -2};
            }

            const acret = yield mysqlconn.select('account', {
                where: {uid: ubret[0].uid},
                columns: ['username']
            });

            if (acret.length > 0) {
                return {
                    uid: ubret[0].uid, 
                    username: acret[0].username,
                    token: token
                };
            }

            return {uid: -1};
        }
    }

    return AccountService;
};