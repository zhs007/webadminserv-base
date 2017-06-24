'use strict';

const ERRCODE = {
    EC_NOPARAMS: 10000,

    EC_LOGINERR: 20000,
    EC_REGERR: 20001,

    EC_UNDEFINED: 99999,
};

module.exports = {
    ERRCODE: ERRCODE,

    makeStrInfo(ec) {
        for (let key in ERRCODE) {
            if (ERRCODE[key] == ec) {
                return key;
            }
        }

        return 'EC_UNDEFINED';
    },

    buildErrInfo(ec) {
        return {
            errcode: ec,
            strinfo: makeErrInfoStr(ec),
        };
    }
};
