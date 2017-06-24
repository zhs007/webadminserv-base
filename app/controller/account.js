'use strict';

module.exports = app => {
    class AccountController extends app.Controller {
        * login() {
            const ctx = this.ctx;
            const resultdata = this.ctx.resultdata;
            const ERRCODE = ctx.helper.ERRCODE;
            ctx.onStart();

            if (!ctx.helper.checkQueryParams(['username', 'password'])) {
                ctx.sendErrInfo(ERRCODE.ERRCODE.EC_NOPARAMS);

                return ;
            }

            const username = ctx.query.username;
            const password = ctx.query.password;

            const ui = yield ctx.service.account.login(username, password);
            if (ui.uid <= 0) {
                ctx.sendErrInfo(ERRCODE.ERRCODE.EC_LOGINERR);

                return ;                
            }

            yield ctx.service.userevent.onLogin(ui);

            ctx.setResultData_myUserInfo(ui);
            ctx.sendResultData(true);
        }

        * reg() {
            const ctx = this.ctx;
            const resultdata = this.ctx.resultdata;
            const ERRCODE = ctx.helper.ERRCODE;
            ctx.onStart();

            if (!ctx.helper.checkQueryParams(['username', 'password'])) {
                ctx.sendErrInfo(ERRCODE.ERRCODE.EC_NOPARAMS);

                return ;
            }

            const username = ctx.query.username;
            const password = ctx.query.password;

            const ui = yield ctx.service.account.reg(username, password);
            if (ui.uid <= 0) {
                ctx.sendErrInfo(ERRCODE.ERRCODE.EC_REGERR);

                return ;                
            }

            yield ctx.service.userevent.onReg(ui);
            yield ctx.service.userevent.onLogin(ui);

            ctx.setResultData_myUserInfo(ui);
            ctx.sendResultData(true);
        }

        * queryWithToken() {
            const ctx = this.ctx;
            const resultdata = this.ctx.resultdata;
            const ERRCODE = ctx.helper.ERRCODE;
            ctx.onStart();

            if (!ctx.helper.checkQueryParams(['token'])) {
                ctx.sendErrInfo(ERRCODE.ERRCODE.EC_NOPARAMS);

                return ;
            }

            const token = ctx.query.token;

            const ui = yield ctx.service.account.queryWithToken(token);
            if (ui.uid > 0) {
                yield ctx.service.userevent.onLogin(ui);
                // yield ctx.service.usercache.saveUserCache(ui);
                // this.ctx.session.ui = ui;
            }            

            ctx.setResultData_myUserInfo(ui);
            ctx.sendResultData(true);
        }

        * logout() {
            const ctx = this.ctx;
            const resultdata = this.ctx.resultdata;
            const ERRCODE = ctx.helper.ERRCODE;
            ctx.onStart();

            if (!ctx.helper.checkQueryParams(['token'])) {
                ctx.sendErrInfo(ERRCODE.ERRCODE.EC_NOPARAMS);

                return ;
            }

            const token = ctx.query.token;

            const ui = yield ctx.service.account.logout(token);
            yield ctx.service.usercache.delUserCache(token);
            // this.ctx.session.ui = undefined;

            ctx.setResultData_myUserInfo(ui);
            ctx.sendResultData(true);
        }
    }
    return AccountController;
};
