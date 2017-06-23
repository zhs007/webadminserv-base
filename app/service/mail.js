'use strict';

var util = require('util');

module.exports = app => {
    class MailService extends app.Service {
        // 获取未读邮件
        * getNoRead(uid) {
            const mysqlconn = app.mysql;

            const ret = yield mysqlconn.count('msginfo', {
                uid: uid, msgstate: 0});

            return ret;
        }

        // 获取邮件
        * getMail(uid, nums) {
            const mysqlconn = app.mysql;

            const ret = yield mysqlconn.select('msginfo', {
                where: {uid: uid},
                columns: ['id', 'msgstate', 'msginfo', 'instime', 'msgtitle']
            });

            return ret;
        }

        // 新增邮件
        * addMail(uid, title, info) {
            // console.log(uid + title + info);

            const mysqlconn = app.mysql;

            const upret = yield mysqlconn.insert('msginfo', {
                uid: uid, 
                msgstate: 0,
                msgtitle: title,
                msginfo: info
            });

            // console.log(JSON.stringify(upret));
            return upret.insertId;
        }

        // 读邮件
        * readMail(uid, mailid) {
            const result = yield app.mysql.update('msginfo', {
                msgstate: 1
            }, {
                where: {id: mailid},
                columns: ['msgstate']
            });

            if (result.affectedRows === 1) {
                return true;
            }

            return false;
        }

        // 读邮件
        * readAllMail(uid) {
            const result = yield app.mysql.update('msginfo', {
                msgstate: 1
            }, {
                where: {uid: uid, msgstate: 0},
                columns: ['msgstate']
            });

            if (result.affectedRows > 0) {
                return true;
            }

            return false;
        }        
    }

    return MailService;
};