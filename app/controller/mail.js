'use strict';

module.exports = app => {
    class MailController extends app.Controller {
        * get() {
            this.ctx.set('Access-Control-Allow-Origin', '*');

            const ctx = this.ctx;
            const token = ctx.query.token;
            const nums = ctx.query.nums;

            let ui = yield ctx.service.usercache.getUserCache(token);
            let arr = yield ctx.service.mail.getMail(ui.uid, nums);

            this.ctx.body = JSON.stringify({data: arr});
        }

        * read() {
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

        * readAll() {
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
    }
    return MailController;
};
