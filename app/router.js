'use strict';

const API_PREFIX = '/api/v1';

module.exports = app => {
  app.get(API_PREFIX + '/account/login', 'account.login');
  app.get(API_PREFIX + '/account/reg', 'account.reg');
  app.get(API_PREFIX + '/account/querywithtoken', 'account.queryWithToken');
  app.get(API_PREFIX + '/account/logout', 'account.logout');

  app.get(API_PREFIX + '/mail/get', 'mail.get');
  app.get(API_PREFIX + '/mail/read', 'mail.read');
  app.get(API_PREFIX + '/mail/readall', 'mail.readAll');

  app.get(API_PREFIX + '/usermgr/get', 'usermgr.get');
};
