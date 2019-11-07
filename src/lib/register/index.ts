// import * as urllib from 'urllib';
// import _ from 'lodash';
import * as _ from 'lodash';
import { Container } from 'midway-web';

/*
 * @Author: 吴占超
 * @Date: 2019-07-24 10:14:47
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-10-09 20:14:11
 */
// export const HTTPCLIENT = 'httpclient';
export const LODASH = '_';

/**
 * 三方注册
 * @param container
 */
export const registerOther = (container: Container) => {
  /**
   * @inject()
   * [HTTPCLIENT]: any;
   */
  // container.registerObject(HTTPCLIENT, urllib);
  /**
   * @inject()
   * _: LoDashStatic;
   */
  container.registerObject(LODASH, _);
};
