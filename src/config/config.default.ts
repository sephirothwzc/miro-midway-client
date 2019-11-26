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

  config.grpc = {
    listen: {
      endpoint: 'localhost:50051',
      dir: 'lib/proto', // proto files dir, relative path
      property: 'grpc' // default attach to `ctx.grpc.**`
      // loadOpts: { convertFieldsToCamelCase: true, }, // message field case: `string user_name` -> `userName`
    }
  };

  // grpc-lcient-egg 配置弃用
  config.grpcClient = {
    clients: [
      {
        name: 'proto',
        protoPath: 'lib/proto/wxapi',
        host: '127.0.0.2',
        port: 50051
      }
    ]
  };
  // config.grpcClient = {
  //   clients: {
  //     shop: {
  //       packageName: 'demo',
  //       serviceName: 'Hello',
  //       // protoPath: path.resolve(__dirname, '../service_def/shop.proto'),
  //       protoPath: path.resolve(__dirname, '../lib/proto/hello.proto'),
  //       // protoPath: 'lib/proto/hello.proto',
  //       sdUri: 'static://127.0.0.1:50051',
  //       grpcProtoLoaderOpts: {
  //         // see:  https://github.com/grpc/grpc-node/tree/master/packages/proto-loader for details
  //       }
  //     }
  //   }
  // };

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
