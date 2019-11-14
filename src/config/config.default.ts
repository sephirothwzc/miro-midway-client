import * as path from 'path';

export = (appInfo: any) => {
  const config: any = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1558664005392_5443';

  // add your config here
  config.middleware = [];

  // cluster
  config.cluster = {
    listen: {
      port: 8090,
      hostname: '0.0.0.0'
    }
  };

  // config.grpc = {
  //   listen: {
  //     endpoint: 'localhost:50051',
  //     dir: 'app/proto', // proto files dir, relative path
  //     property: 'grpc' // default attach to `ctx.grpc.**`
  //     // loadOpts: { convertFieldsToCamelCase: true, }, // message field case: `string user_name` -> `userName`
  //   }
  // };

  config.grpcClient = {
    clients: [
      {
        name: 'proto',
        protoPath: 'lib/proto',
        host: '172.20.10.4',
        port: 50051
      }
    ]
  };

  config.security = {
    csrf: {
      enable: false
    }
  };

  config.view = {
    root: [path.join(appInfo.baseDir, 'app/public')].join(','),
    baseDir: 'app/public',
    defaultExtension: '.nj',
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks'
    }
  };

  // static
  config.static = {
    prefix: '/web/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    gzip: true
  };

  config.bodyParser = {
    jsonLimit: '20mb',
    formLimit: '20mb'
  };
  return config;
};
