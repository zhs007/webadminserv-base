// app.js

module.exports = app => {
    // // set redis session store
    // // session store must have 3 methods
    // // define sessionStore in `app.js` so you can access `app.redis`
    // app.sessionStore = {
    //     * get(key) {
    //         const res = yield app.redis.get(key);
    //         if (!res) {
    //             return null;
    //         }
        
    //         return JSON.parse(res);
    //     },

    //     * set(key, value, maxAge) {
    //         // maxAge not present means session cookies
    //         // we can't exactly know the maxAge and just set an appropriate value like one day
    //         if (!maxAge) {
    //             maxAge = 24 * 60 * 60 * 1000;
    //         }
    //         value = JSON.stringify(value);

    //         const redisconn = app.redis;
    //         yield redisconn.set(key, value, 'PX', maxAge);
    //     },

    //     * destroy(key) {
    //         const redisconn = app.redis;
    //         yield app.redis.del(key);
    //     },
    // };
};
