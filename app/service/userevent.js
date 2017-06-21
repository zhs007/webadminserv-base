'use strict';

var util = require('util');

module.exports = app => {
    class UserEventService extends app.Service {
        // 每个用户登录成功后都会调用
        * onLogin(ui) {
            const ctx = this.ctx;

            ui.permissions = yield ctx.service.permissions.getPermissions(ui.uid);
            yield ctx.service.usercache.saveUserCache(ui);

            return ui;
        }
    }

    return UserEventService;
};