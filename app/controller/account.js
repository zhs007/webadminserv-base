'use strict';

module.exports = app => {
    class AccountController extends app.Controller {
        * login() {
            const ctx = this.ctx;
            const username = ctx.query.username;
            const password = ctx.query.password;

            const ui = yield ctx.service.account.login(username, password);

            this.ctx.body = JSON.stringify(ui);
        }

        * reg() {
            const ctx = this.ctx;
            const username = ctx.query.username;
            const password = ctx.query.password;

            const ui = yield ctx.service.account.reg(username, password);

            this.ctx.body = JSON.stringify(ui);
        }
    }
    return AccountController;
};
