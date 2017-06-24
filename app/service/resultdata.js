'use strict';

var util = require('util');

// 返回给客户端的数据整合
// 基于客户端的同类型数据在一次请求里，只可能会有一个返回这个假设

module.exports = app => {
    class ResultDataService extends app.Service {
        // 每个用户登录成功后都会调用
        * onLogin(ui) {
            const ctx = this.ctx;

            ui.permissions = yield ctx.service.permissions.getPermissions(ui.uid);
            ui.noreadmail = yield ctx.service.mail.getNoRead(ui.uid);
            yield ctx.service.usercache.saveUserCache(ui);

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

    return ResultDataService;
};