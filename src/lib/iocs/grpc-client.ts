import { promisify } from 'util';
import { providerWrapper } from 'midway';

/*
 * @Author: 吴占超
 * @Date: 2019-11-15 11:25:24
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-11-15 12:33:30
 */

export interface IGrpcClient {
  consul: (
    packageservice: string,
    serviceName: string,
    pathName?: string,
    address?: string
  ) => any;
}

export const grpcClient = (context: any) =>
  ({
    consul(
      packageservice: string,
      serviceName: string,
      pathName = serviceName,
      address: string
    ) {
      const path = require('path');
      const PROTO_PATH = path.resolve(__dirname, `../proto/${pathName}.proto`);

      const GRPCClient = require('node-grpc-client');

      const myClient = new GRPCClient(
        PROTO_PATH,
        packageservice,
        serviceName,
        address
      );

      const methodNames = myClient.listNameMethods;
      methodNames.forEach((p: string) => {
        myClient[p] = promisify(myClient[`${p}Async`]);
      });

      return myClient;
    }
  } as IGrpcClient);

providerWrapper([
  {
    id: 'grpcClient',
    provider: grpcClient
  }
]);
