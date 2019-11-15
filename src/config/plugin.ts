// had enabled by midway
export = {
  static: true,
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  cache: {
    enable: true,
    package: 'egg-cache'
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
  grpc: {
    enable: true,
    package: 'egg-grpc'
  },
  // routerPlus: {
  //   enable: true,
  //   package: 'egg-router-plus'
  // },
  // 放弃此方案换用动态方案
  // grpcClient: {
  //   enable: true,
  //   package: 'grpc-client-egg'
  // },
  // grpcClient: {
  //   enable: true,
  //   package: 'egg-grpc-client-plugin'
  // },
  consulPlus: {
    enable: true,
    package: 'egg-consul-plus'
  }
};
