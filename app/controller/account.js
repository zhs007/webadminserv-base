'use strict';

module.exports = app => {
  class AccountController extends app.Controller {
    * login() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      ctx.onStart(false);

      if (!ctx.helper.checkQueryParams(['username', 'password'])) {
        ctx.sendErrInfo(ERRCODE.ERRCODE.EC_NOPARAMS);

        return;
      }

      const username = ctx.query.username;
      const password = ctx.query.password;

      const ui = yield ctx.service.account.login(username, password);
      if (ui.uid <= 0) {
        ctx.sendErrInfo(ERRCODE.ERRCODE.EC_LOGINERR);

        return;
      }

      yield ctx.service.userevent.onLogin(ui);

      ctx.setMyUserInfo(ui, true);
      ctx.sendResultData(true, true);
    }

    * reg() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      ctx.onStart(false);

      if (!ctx.helper.checkQueryParams(['username', 'password'])) {
        ctx.sendErrInfo(ERRCODE.ERRCODE.EC_NOPARAMS);

        return;
      }

      const username = ctx.query.username;
      const password = ctx.query.password;

      const ui = yield ctx.service.account.reg(username, password);
      if (ui.uid <= 0) {
        ctx.sendErrInfo(ERRCODE.ERRCODE.EC_REGERR);

        return;
      }

      yield ctx.service.userevent.onReg(ui);
      yield ctx.service.userevent.onLogin(ui);

      ctx.setMyUserInfo(ui, true);
      ctx.sendResultData(true, true);
    }

    * queryWithToken() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      ctx.onStart(true);

      if (!ctx.helper.checkQueryParams(['token'])) {
        ctx.sendErrInfo(ERRCODE.ERRCODE.EC_NOPARAMS);

        return;
      }

      const token = ctx.query.token;

      const ui = yield ctx.service.account.queryWithToken(token);
      if (ui.uid <= 0) {
        ctx.sendErrInfo(ERRCODE.ERRCODE.EC_TOKENERR);

        return;
      }

      yield ctx.service.userevent.onLogin(ui);

      ctx.setMyUserInfo(ui, true);
      ctx.sendResultData(true, true);
    }

    * logout() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      ctx.onStart(true);

      if (!ctx.helper.checkQueryParams(['token'])) {
        ctx.sendErrInfo(ERRCODE.ERRCODE.EC_NOPARAMS);

        return;
      }

      const token = ctx.query.token;

      const ui = yield ctx.service.account.logout(token);
      yield ctx.usercache.del(token);

      ctx.setMyUserInfo({ uid: -1 });
      ctx.sendResultData(true, false);
    }
  }
  return AccountController;
};
