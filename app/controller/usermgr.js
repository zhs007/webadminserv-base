'use strict';

module.exports = app => {
  class UserMgrController extends app.Controller {
    * get() {
      const ctx = this.ctx;
      const resultdata = this.ctx.resultdata;
      const ERRCODE = ctx.helper.ERRCODE;
      yield ctx.onStart(true);

      if (!ctx.helper.checkQueryParams(['token', 'nums'])) {
        yield ctx.sendErrInfo(ERRCODE.EC_NOPARAMS);

        return;
      }

      const nums = ctx.query.nums;

      let arr = [];
      let arrroot = yield ctx.service.usermgr.getUserlist_root(nums);
      let arrnotroot = yield ctx.service.usermgr.getUserlist_notroot(nums);

      for (let i = 0; i < arrroot.length; ++i) {
        arrroot[i].isroot = true;
        arr.push(arrroot[i]);
      }
      
      for (let i = 0; i < arrnotroot.length; ++i) {
        arrnotroot[i].isroot = false;
        arr.push(arrnotroot[i]);
      }

      ctx.resultdata.setUserList(arr);
      yield ctx.sendResultData(true, false);
    }
  }

  return UserMgrController;
};
