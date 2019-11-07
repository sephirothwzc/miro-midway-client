/*
 * @Author: 吴占超
 * @Date: 2019-10-28 14:10:56
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-10-29 11:48:59
 */
import { provide, Context, plugin } from 'midway';
import { BaseController } from '../../base/base.controller';
import {
  SwaggerJoiController as sjc,
  SwaggerJoiGet
} from 'midway-joi-swagger2';

@provide()
@sjc({ path: '/api/share', api: 'share' })
export class ShareController extends BaseController {
  @plugin()
  private grpcClient: any;

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
    const result = await this.grpcClient.proto.demo.Hello.SayHello({
      code: '0',
      message: '来自Node客户端的OK'
    });
    console.log(this.grpcClient);
    // console.log(this.grpc);
    // 获得HelloService实例
    // const helloService = ctx.grpc.demo.Hello;

    // // 向服务端发送请求
    // const result = await helloService.SayHello({
    //   code: '0',
    //   message: '来自Node客户端的OK'
    // });

    // 打印服务端响应内容
    console.log(result);
    ctx.body = result;
  }
}
