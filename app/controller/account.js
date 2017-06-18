'use strict';

module.exports = app => {
    class AccountController extends app.Controller {
        * login() {
            this.ctx.set('Access-Control-Allow-Origin', '*');

            const ctx = this.ctx;
            const username = ctx.query.username;
            const password = ctx.query.password;

            const ui = yield ctx.service.account.login(username, password);

            this.ctx.body = JSON.stringify(ui);
        }

        * reg() {
            this.ctx.set('Access-Control-Allow-Origin', '*');

            const ctx = this.ctx;
            const username = ctx.query.username;
            const password = ctx.query.password;

            const ui = yield ctx.service.account.reg(username, password);

            this.ctx.body = JSON.stringify(ui);
        }

        * queryWithToken() {
            this.ctx.set('Access-Control-Allow-Origin', '*');
            
            const ctx = this.ctx;
            const token = ctx.query.token;

            const ui = yield ctx.service.account.queryWithToken(token);

            this.ctx.body = JSON.stringify(ui);
        }
    }
    return AccountController;
};
