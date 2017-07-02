'use strict';

const API_PREFIX = '/api/v1';

module.exports = app => {
  app.post(API_PREFIX + '/account/login', 'account.login');
  app.post(API_PREFIX + '/account/reg', 'account.reg');
  app.post(API_PREFIX + '/account/querywithtoken', 'account.queryWithToken');
  app.post(API_PREFIX + '/account/logout', 'account.logout');

  app.post(API_PREFIX + '/mail/get', 'mail.get');
  app.post(API_PREFIX + '/mail/read', 'mail.read');
  app.post(API_PREFIX + '/mail/readall', 'mail.readAll');

  app.post(API_PREFIX + '/usermgr/get', 'usermgr.get');

  // app.get(API_PREFIX + '/range/get', 'range.get');
  app.post(API_PREFIX + '/range/get', 'range.get');
  app.post(API_PREFIX + '/range/newgroup', 'range.newgroup');
  app.post(API_PREFIX + '/range/updgroup', 'range.updgroup');

  // app.post(API_PREFIX + '/range/get', 'range.get1');
  // app.post('/', 'range.get1');
};
