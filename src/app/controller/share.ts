/*
 * @Author: 吴占超
 * @Date: 2019-10-28 14:10:56
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-11-26 11:56:09
 */
import { provide, Context, plugin, inject } from 'midway';
import { BaseController } from '../../base/base.controller';
import {
  SwaggerJoiController as sjc,
  SwaggerJoiGet
} from 'midway-joi-swagger2';
import { IGrpcClient } from '../../lib/iocs/grpc-client';

@provide()
@sjc({ path: '/api/share', api: 'share' })
export class ShareController extends BaseController {
  @plugin()
  private grpcClient: any;

  @inject('grpcClient')
  grpcClient2: IGrpcClient;

  // @plugin()
  // private grpc: any;

  @SwaggerJoiGet({
    path: '/grpc',
    api: 'share',
    description: '',
    summary: 'grpcQuickstart'
    // query: schemas.SGrpcQuickstartIn,
    // responses: schemas.SGrpcQuickstartOut
  })
  async grpcQuickstart(ctx: Context) {
    const client = ctx.grpc.egg.share.showCase;
    const result = await client.echo({ code: 200 });
    ctx.body = result;
  }

  @SwaggerJoiGet({
    path: '/hello',
    api: 'share',
    description: '',
    summary: 'hello'
    //  query: schemas.SHelloIn,
    //  responses: schemas.SHelloOut
  })
  async hello(ctx: Context) {
    console.log(this.grpcClient);
    // #region egg-grpc-client-plus
    // const result = await this.grpcClient.proto.demo.Hello.SayHello({
    //   code: '0',
    //   message: '来自Node客户端的OK'
    // });
    // const result = await this.grpcClient.clients['shop'].sayHello({
    //   code: '0',
    //   message: '来自Node客户端的OK'
    // });
    // console.log(this.grpcClient);
    // console.log(this.grpc);
    // #endregion egg-grpc-client-plus

    // #region grpc-client-egg
    // 获得HelloService实例
    const helloService = this.grpcClient.proto.demo.Hello;

    // 向服务端发送请求
    const result = await helloService.SayHello({
      code: '0',
      message: '来自Node客户端的OK'
    });
    // #endregion

    // 打印服务端响应内容
    console.log(result);
    ctx.body = result;
  }

  @SwaggerJoiGet({
    path: '/test-consul',
    api: 'share',
    description: '测试获取consul',
    summary: 'testConsul'
    //  query: schemas.StestConsulIn,
    //  responses: schemas.StestConsulOut
  })
  async testConsul(ctx: Context) {
    console.log(ctx.app['services']);
    const address = ctx.app['services'].consulPlusTest.replace('http://', '');
    const dd = this.grpcClient2.consul('demo', 'Hello', 'hello', address);
    // console.log(dd);
    // const client = new ctx.app['grpcProto'].demo.Hello();
    // console.log(client);
    // const result = yield client.echo({ code: 200 });
    ctx.body = await dd.sayHello({
      code: '201',
      message: '来自Node客户端的OK'
    });
    // ctx.body = 'hi consul';
  }
}
