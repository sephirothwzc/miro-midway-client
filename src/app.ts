/*
 * @Author: 吴占超
 * @Date: 2019-05-25 09:56:11
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-10-28 14:21:44
 */
import { IDBContext } from './lib/models/dbcontext';
import { wrapper } from 'midway-joi-swagger2';
import { Application } from 'midway';
import { registerOther } from './lib/register';

module.exports = (app: Application) => {
  app.beforeStart(async () => {
    console.log('====================================');
    console.log('🚀  Your awesome APP is launching...');
    console.log('====================================');
    /**
     * 三方注册
     */
    registerOther(app.applicationContext);

    const db: IDBContext = await app.applicationContext.getAsync('DBContext');
    // const db = new DBContext(app.config.sequelize, app.config.env);
    db.init();
    // 配置文件建议从config读取
    wrapper(app, app.config.joiSwagger);
    console.log('====================================');
    console.log(
      `✅  http://${app.config.cluster.listen.hostname}:${app.config.cluster.listen.port}`
    );
    console.log(
      `✅  http://${app.config.cluster.listen.hostname}:${app.config.cluster.listen.port}/swagger-html`
    );
    console.log('✅  Your awesome APP launched');
    console.log('====================================');
  });
};
