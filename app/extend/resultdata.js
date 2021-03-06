'use strict';

class ResultData {
  constructor() {
    this.data = {};
  }

  setMyUserInfo(ui) {
    this.data.myuserinfo = ui;
  }

  setErrInfo(ei) {
    this.data.errinfo = ei;
  }

  setMailList(lstmail) {
    this.data.lstmail = lstmail;
  }

  setUserList(lstuser) {
    this.data.lstuser = lstuser;
  }

  setRangeInfo(rangeinfo) {
    this.data.rangeinfo = rangeinfo;
  }    

  end(isok) {
    this.data.isok = isok;

    return JSON.stringify(this.data);
  }
};

module.exports = {
  ResultData: ResultData
};
