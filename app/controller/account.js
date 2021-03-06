'use strict';

module.exports = app => {
  class AccountController extends app.Controller {
    * login() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      yield ctx.onStart(false);

      if (!ctx.helper.checkRequestParams(['username', 'password'])) {
        yield ctx.sendErrInfo(ERRCODE.EC_NOPARAMS);

        return;
      }

      const username = ctx.helper.getRequestParam('username');
      const password = ctx.helper.getRequestParam('password');

      const ui = yield ctx.service.account.login(username, password);
      if (ui.uid <= 0) {
        yield ctx.sendErrInfo(ERRCODE.EC_LOGINERR);

        return;
      }

      yield ctx.service.userevent.onLogin(ui);

      ctx.setMyUserInfo(ui, true);
      yield ctx.sendResultData(true, true);
    }

    * reg() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      yield ctx.onStart(false);

      if (!ctx.helper.checkRequestParams(['username', 'password'])) {
        yield ctx.sendErrInfo(ERRCODE.EC_NOPARAMS);

        return;
      }

      const username = ctx.helper.getRequestParam('username');
      const password = ctx.helper.getRequestParam('password');

      const ui = yield ctx.service.account.reg(username, password);
      if (ui.uid <= 0) {
        yield ctx.sendErrInfo(ERRCODE.EC_REGERR);

        return;
      }

      yield ctx.service.userevent.onReg(ui);
      yield ctx.service.userevent.onLogin(ui);

      ctx.setMyUserInfo(ui, true);
      yield ctx.sendResultData(true, true);
    }

    * queryWithToken() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      yield ctx.onStart(true);

      if (!ctx.helper.checkRequestParams(['token'])) {
        yield ctx.sendErrInfo(ERRCODE.EC_NOPARAMS);

        return;
      }

      const token = ctx.helper.getRequestParam('token');

      const ui = yield ctx.service.account.queryWithToken(token);
      if (ui.uid <= 0) {
        yield ctx.sendErrInfo(ERRCODE.EC_TOKENERR);

        return;
      }

      yield ctx.service.userevent.onLogin(ui);

      ctx.setMyUserInfo(ui, true);
      yield ctx.sendResultData(true, true);
    }

    * logout() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      yield ctx.onStart(true);

      if (!ctx.helper.checkRequestParams(['token'])) {
        yield ctx.sendErrInfo(ERRCODE.EC_NOPARAMS);

        return;
      }

      const token = ctx.helper.getRequestParam('token');

      const ui = yield ctx.service.account.logout(token);
      yield ctx.usercache.del(token);

      ctx.setMyUserInfo({ uid: -1 });
      yield ctx.sendResultData(true, false);
    }
  }
  return AccountController;
};
