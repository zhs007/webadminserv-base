'use strict';

const {ResultData} = require('./resultdata');

const RESULTDATA = Symbol('Context#resultdata');
module.exports = {
    onStart() {
        this.set('Access-Control-Allow-Origin', '*');
    },

    get resultdata() {
        if (!this[RESULTDATA]) {
            this[RESULTDATA] = new ResultData();
        }

        return this[RESULTDATA];
    },

    sendResultData(isok) {
        this.body = this.resultdata.end(isok);
    },

    sendErrInfo(ec) {
        this.resultdata.setErrInfo(this.helper.buildErrInfo(ec));
        this.sendResultData(false);
    }
};
