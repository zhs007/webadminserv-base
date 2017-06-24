'use strict';

module.exports = app => {
  class UserMgrController extends app.Controller {
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

      let arr = yield ctx.service.usermgr.getUserlist(nums);

      ctx.resultdata.setMailList(arr);
      ctx.sendResultData(true, false);
    }
  }

  return UserMgrController;
};
