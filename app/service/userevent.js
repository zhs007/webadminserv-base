'use strict';

var util = require('util');

module.exports = app => {
  class UserEventService extends app.Service {
    // 每个用户登录成功后都会调用
    * onLogin(ui) {
      const ctx = this.ctx;

      ui.permissions = yield ctx.service.permissions.getPermissions(ui.uid);
      ui.noreadmail = yield ctx.service.mail.getNoRead(ui.uid);
      // yield ctx.service.usercache.saveUserCache(ui);

      return ui;
    }

    // 每个用户注册成功后都会调用
    * onReg(ui) {
      // console.log('onReg');

      const ctx = this.ctx;

      yield ctx.service.mail.addMail(ui.uid,
        '欢迎您使用Holdem.Tech', '欢迎您使用Holdem.Tech!');

      return ui;
    }
  }

  return UserEventService;
};