/*
 * @Author: 吴占超
 * @Date: 2019-10-06 11:07:27
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-10-28 13:53:31
 *  routerOptions: {
 *    middleware: ['injectAuthMiddleware']
 *  }
 */
import { Middleware, WebMiddleware, provide, plugin } from 'midway';
import { promisify } from 'util';
import { IAuth } from '../../lib/interfaces/sys-user';

@provide()
export class InjectAuthMiddleware implements WebMiddleware {
  @plugin()
  jwt: any;

  resolve(): Middleware {
    return async (ctx, next) => {
      const { token } = ctx.request.header;
      if (token) {
        // const decoded = await checkVerify(ctx, token);
        const promiseVerify = promisify(this.jwt.verify);
        return promiseVerify(token, ctx.app.config.jwt.secret)
          .then(async (decoded: IAuth) => {
            const auth: IAuth = await ctx.requestContext.getAsync('Auth');
            auth.id = decoded.id;
            auth.onTime = decoded.onTime;
            auth.userName = decoded.userName;
            auth.provider = decoded.provider;
            return next();
          })
          .catch((err: Error) => {
            return ctx.throw(401, err.message);
          });
      } else {
        return ctx.throw(401, '401.2');
      }
    };
  }
}
