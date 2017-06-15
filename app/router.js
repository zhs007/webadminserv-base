'use strict';

module.exports = app => {
  app.get('/', 'home.index');

  app.get('/account/login', 'account.login');
  app.get('/account/reg', 'account.reg');
};
