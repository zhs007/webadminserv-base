'use strict';

var util = require('util');

// 权限策略：
// 1、大部分用户权限都是一样的（没有权限），只有特殊用户才有特殊权限
// 2、新功能测试阶段，会开放部分测试权限，正式上线后就清理掉

module.exports = app => {
  class PermissionsService extends app.Service {
    // 获取权限
    * getPermissions(uid) {
      const mysqlconn = app.mysql;
      const ret = yield mysqlconn.select('permissions', {
        where: { uid: uid },
        columns: ['permissions']
      });

      // console.log(uid);
      // console.log(JSON.stringify(ret));

      let arr = [];
      for (let i = 0; i < ret.length; ++i) {
        arr.push(ret[i].permissions);
      }

      // console.log(JSON.stringify(arr));

      return arr;
    }

    // 加权限
    * addPermissions(uid, permissions) {
      const mysqlconn = app.mysql;

      const upret = yield mysqlconn.insert('permissions', {
        uid: uid,
        permissions: permissions
      });

      return upret.insertId;
    }

    // 取消权限
    * delPermissions(uid, permissions) {
      const mysqlconn = app.mysql;

      const upret = yield mysqlconn.delete('permissions', {
        uid: uid,
        permissions: permissions
      });

      return upret.affectedRows;
    }

    // 取消所有权限
    * delAllPermissions(permissions) {
      const mysqlconn = app.mysql;

      const upret = yield mysqlconn.delete('permissions', {
        permissions: permissions
      });

      return upret.affectedRows;
    }
  }

  return PermissionsService;
};