'use strict';

module.exports = app => {
  class MailController extends app.Controller {
    * get() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      yield ctx.onStart(true);

      if (!ctx.helper.checkRequestParams(['token', 'nums'])) {
        yield ctx.sendErrInfo(ERRCODE.EC_NOPARAMS);

        return;
      }

      const nums = ctx.helper.getRequestParam('nums');

      let arr = yield ctx.service.mail.getMail(ctx.usercache.ui.uid, nums);

      ctx.resultdata.setMailList(arr);
      yield ctx.sendResultData(true, false);
    }

    * read() {
      this.ctx.set('Access-Control-Allow-Origin', '*');

      const ctx = this.ctx;
      const username = ctx.helper.getRequestParam('username');
      const password = ctx.helper.getRequestParam('password');

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
      const username = ctx.helper.getRequestParam('username');
      const password = ctx.helper.getRequestParam('password');

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
