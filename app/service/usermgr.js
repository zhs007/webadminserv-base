'use strict';

var util = require('util');

module.exports = app => {
  class UserMgrService extends app.Service {
    // 获取用户列表
    * getUserlist_root(nums) {
      const mysqlconn = app.mysql;
      const sql = util.format("select userbase.uid, account.createtime, userbase.nickname, userbase.lastlogintime from userbase join account on account.uid = userbase.uid where userbase.uid in (select uid from permissions where permissions = 'root') limit 0, %d", nums);
      const rows = yield mysqlconn.query(sql);

      return rows;
    }

    // 获取用户列表
    * getUserlist_notroot(nums) {
      const mysqlconn = app.mysql;
      const sql = util.format("select userbase.uid, account.createtime, userbase.nickname, userbase.lastlogintime from userbase join account on account.uid = userbase.uid where userbase.uid not in (select uid from permissions where permissions = 'root') limit 0, %d", nums);
      const rows = yield mysqlconn.query(sql);

      return rows;
    }    

    // 获取用户列表
    * getUserlist(nums) {
      const mysqlconn = app.mysql;
      const sql = util.format("select userbase.uid, account.createtime, userbase.nickname, userbase.lastlogintime from userbase join account on account.uid = userbase.uid limit 0, %d", nums);
      const rows = yield mysqlconn.query(sql);

      return rows;
    }
  }

  return UserMgrService;
};