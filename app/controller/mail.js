'use strict';

module.exports = app => {
  class MailController extends app.Controller {
    * get() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      ctx.onStart(true);

      if (!ctx.helper.checkQueryParams(['token', 'nums'])) {
        ctx.sendErrInfo(ERRCODE.ERRCODE.EC_NOPARAMS);

        return;
      }

      const nums = ctx.query.nums;

      let arr = yield ctx.service.mail.getMail(ctx.usercache.ui.uid, nums);

      ctx.resultdata.setMailList(arr);
      ctx.sendResultData(true, false);
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
