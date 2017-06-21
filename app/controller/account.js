'use strict';

module.exports = app => {
    class AccountController extends app.Controller {
        * login() {
            this.ctx.set('Access-Control-Allow-Origin', '*');

            const ctx = this.ctx;
            const username = ctx.query.username;
            const password = ctx.query.password;

            const ui = yield ctx.service.account.login(username, password);
            if (ui.uid > 0) {
                yield ctx.service.userevent.onLogin(ui);
                // yield ctx.service.usercache.saveUserCache(ui);
                // this.ctx.session.ui = ui;
            }

            this.ctx.body = JSON.stringify(ui);
        }

        * reg() {
            this.ctx.set('Access-Control-Allow-Origin', '*');

            const ctx = this.ctx;
            const username = ctx.query.username;
            const password = ctx.query.password;

            const ui = yield ctx.service.account.reg(username, password);
            if (ui.uid > 0) {
                yield ctx.service.userevent.onLogin(ui);
                // yield ctx.service.usercache.saveUserCache(ui);
                // this.ctx.session.ui = ui;
            }

            this.ctx.body = JSON.stringify(ui);
        }

        * queryWithToken() {
            this.ctx.set('Access-Control-Allow-Origin', '*');
            
            const ctx = this.ctx;
            const token = ctx.query.token;

            const ui = yield ctx.service.account.queryWithToken(token);
            if (ui.uid > 0) {
                yield ctx.service.userevent.onLogin(ui);
                // yield ctx.service.usercache.saveUserCache(ui);
                // this.ctx.session.ui = ui;
            }            

            this.ctx.body = JSON.stringify(ui);
        }

        * logout() {
            this.ctx.set('Access-Control-Allow-Origin', '*');
            
            const ctx = this.ctx;
            const token = ctx.query.token;

            const ui = yield ctx.service.account.logout(token);
            yield ctx.service.usercache.delUserCache(token);
            // this.ctx.session.ui = undefined;

            this.ctx.body = JSON.stringify(ui);
        }
    }
    return AccountController;
};
