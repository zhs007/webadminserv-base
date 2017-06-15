'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1496966708806_9675';

  // add your config here
  config.mysql = {
    // database configuration
    client: {
      // host
      host: '',
      // port
      port: '',
      // username
      user: '',
      // password
      password: '',
      // database
      database: '',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  return config;
};
