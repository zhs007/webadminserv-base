'use strict';

const API_PREFIX = '/api/v1';

module.exports = app => {
  app.get('/', 'home.index');

  app.get(API_PREFIX + '/account/login', 'account.login');
  app.get(API_PREFIX + '/account/reg', 'account.reg');
  app.get(API_PREFIX + '/account/querywithtoken', 'account.queryWithToken');
};
