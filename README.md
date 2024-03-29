# midway-base

base midway

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [midway 文档][midway]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [midway-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [midway 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod)

[midway]: https://midwayjs.org

### 项目结构

```项目结构
.
├── README.md
├── README.zh-CN.md
├── dist                                ---- 编译后目录
├── database                            ---- sequelize v5
│   └── migrations                      ---- db migrations
│       ├── 20190527062554-init-*.js    ---- init .js文件数据库创建、upd 修改
│       └── config.json                 ---- config
├── logs                                ---- 本地日志目录
│   └── midway6-test                    ---- 日志应用名开头
│       ├── common-error.log            ---- 错误日志
│       ├── midway-agent.log            ---- agent 输出的日志
│       ├── midway-core.log             ---- 框架输出的日志
│       ├── midway-web.log              ---- koa 输出的日志
│       └── midway6-test-web.log
├── package.json
├── src                                 ---- 源码目录
│   ├── app                             ---- web 层目录
│   │   ├── controller                  ---- web 层 controller 目录
│   │   │   ├── home.ts
│   │   │   └── user.ts
│   │   ├── middleware (可选)            ---- web 层中间件目录
│   │   │   └── trace.ts
│   │   ├── public (可选)                ---- web 层静态文件目录，可以配置
│   │   └── view (可选)
│   │       └── home.tpl                ---- web 层模板
│   ├── base                            ---- base 封装
│   │   ├── base.controller.ts
│   │   ├── base.model.ts
│   │   └── base.service.ts
│   ├── config
│   │   ├── config.default.ts
│   │   ├── config.local.ts
│   │   ├── config.prod.ts
│   │   ├── config.unittest.ts
│   │   └── plugin.ts
│   └── lib                             ---- 业务逻辑层目录，自由定义
│   │   ├── interfaces                  ---- service param interface for in\out
│   │   │   └── user.ts                 ---- multiple param for service
│   │   ├── iocs                        ---- 辅助注入对象
│   │   │   └── ctx-handler.ts          ---- ctx原有属性处理
│   │   ├── models                      ---- model for sequelize-typescript
│   │   │   ├── dbcontext.ts            ---- context
│   │   │   └── user.model.ts           ---- model code helper create
│   │   ├── schemas                     ---- 导出joi用schemas
│   │   │   └── user.ts
│   │   ├── service                     ---- 业务逻辑层，自由定义
│   │   │   └── user.ts
│   │   └── utils                       ---- 常用工具类
│   │       └── tcmq.ts                 ---- 腾讯云封装provide
│   ├── app.ts                          ---- 应用扩展文件，可选
│   └── agent.ts                        ---- agent 扩展文件，可选
├── test
│   └── app
│       └── controller
│           └── home.test.ts
├── types                               ---- 自定义*.d.ts
│   └── biguint-format.d.ts
├── tsconfig.json
└── tslint.json
```

### migration

```初始化表结构
npx sequelize migration:generate --name=init-users
```

```执行 migrate 进行数据库变更
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
```

## 开发规范

### 命名规范

1. 文件夹 小写中横线分词
2. 文件 小写中横线分词
3. 类名 帕斯卡命名
4. 接口名 I+帕斯卡命名
5. schema 命名 S+帕斯卡命名 In\S+帕斯卡命名 Out
6. 方法名 小驼峰
7. 变量名 小驼峰 Model inject 帕斯卡
8. 常量 全大写下划线分词
9. 枚举 E+帕斯卡命名，枚举 item name 帕斯卡命名
10. 命名要求简洁明了 英文命名，如果不明确命名可以采用，类型命名法 如: string1、string2 不允许其他无意义命名
11. 代码层级不允许超过 4 级
12. 鉴于换行等因素 function 不允许超过 60 行
13. 路由命名优先 restful api 定向 api 采用 soa 命名 路由采用全小写中横线分词
14. 注释 方法采用 document this 变量使用/\* \*/
15. private
16. function param type in I[function]In、out I[function]Out
17. 文件必须启用 vscode-fileheader
18. 类作为名词存在，则 action 尽量采用动词，单一职责动词不需要追加名词。
19. 建议命名如下

```
controller:
@get('/')
async index(ctx:Context) {}

@get('/:id')
async show(ctx:Context) {}

// 或者采用joi query参数传递
@get('/')
async show(ctx:Context) {}

@post('/')
async create(ctx:Context) {}

@put('/:id') // or body
async update(ctx:Context) {}

@del('/:id') // or query
async destroy(ctx:Context) {}

service:
async findAll(param:IFindAllIn):Promise<Model[]> {}

async findAndCountAll(param: IFindAndCountAllIn): Promise<IFindAndCountAllOut> {}

... findOne ...

async create(param:ICreateIn):Promise<ICreateOut> {}

... update ...

... destroy ...

```

### DataBase

- table\column
  全小写，下划线分词
- 主键  
  id（pk 开头 or sequelize 默认）
- 默认字段
  - created_at
  - updated_at
  - deleted_at
- not null
  - 根据业务值进行默认值设置优先推荐的默认值顺序：''>0>-1>特殊定义
  - datetime、date、timestamp：按照业务需要为 null 的情况下，尽量作为辅助字段，不作为优先筛选字段，例如搭配 state 字段
- function  
  全小写下划线分词，[fun_]开头。根据业务复杂程度尽量不要启用自定义函数。
- view  
  全小写下划线分词，[view_]开头。
- 关系  
  [表名_id]
- 常规业务采用三范式原则，交易、金钱、积分相关业务保证数据留痕，以及性能采用反范式。

### 错误码

- 204  
  前端处理
- 401  
  前端处理-权限错误
- 422
  后端参数校验错误-message
- 500
  前端处理（后端方法错误）
- 511
  后端处理（已知错误提示，前端 toasted）
- 512
  前端处理 (已知错误提示 需要跳转)

### 2019-07-04

集成 midway-joi-swagger2
https://github.com/sephirothwzc/midway-joi-swagger2

### transaction

then、Promise.all

```
  @inject('DBContext')
  db: IDBContext;

  @inject()
  OrderModel: IOrderModel;

  @inject()
  OrderItemModel: IOrderItemModel;

  @post('/')
  async index(ctx: Context) {
    const result = await this.db.sequelize
      .transaction(t => {
        // 在这里链接你的所有查询. 确保你返回他们.
        return this.OrderModel.create(
          {
            code: '002',
            cardId: '0000000001'
          },
          { transaction: t }
        ).then(order => {
          return this.OrderItemModel.create(
            {
              code:
                '002-001',
              orderId: order.id
            },
            { transaction: t }
          );
        });
      })
      .then(result => {
        // 事务已被提交
        // result 是 promise 链返回到事务回调的结果
        return result;
      })
      .catch(err => {
        // 事务已被回滚
        // err 是拒绝 promise 链返回到事务回调的错误
        return err;
      });
    ctx.body = result;
  }
```

### eslint 规则

1、no-unused-vars ：禁止出现未使用过的变量
2、eqeqeq ： 要求使用 === 和 !==
3、no-use-before-define ：禁止在变量定义之前使用它们
4、object-curly-spacing ：强制在大括号中使用一致的空格
5、indent ： 强制使用一致的缩进
6、array-bracket-spacing ： 强制数组方括号中使用一致的空格
7、no-eq-null ：禁止在没有类型检查操作符的情况下与 null 进行比较 http://eslint.cn/docs/rules/no-eq-null
8、prefer-const ：要求使用 const 声明那些声明后不再被修改的变量
9、no-global-assign ：
10、arrow-body-style: 要求箭头函数体使用大括号
11、no-undefined ：禁止将 undefined 作为标识符

注意：本来可以通过 npm run lint -- --fix 来解决 4、5、6 的， 但是每次代码的格式都要被打乱就没有用，特此注释

### docker

1. 查看本地 node 版本

```
docker images
```

2. 本地版本过低更新最新版本 node

```
docker pull node
```

3. 安装 typescript image

```
docker pull sandrokeil/typescript
```

4. 创建 image

```
docker image build -t miro-midway:1.0 .
```

5. 错误后删除(可选)

```
docker rm /miro-midway
```

6. 运行

```
docker container run --publish 8000:8099 --detach --name miro-midway miro-midway:1.0
```

7. logs

```
 docker logs -f miro-midway
```

8. 查看进程

```
docker ps
docker ps -a
docker logs miro-midway
```

9. 删除 image

```
docker container stop mm
docker rmi -f miro-midway:1.0
```

10. egg 启动必须去掉 `--daemon`
11. 暴露容器端口 `EXPOSE 9002`

### consul

- 查看环境变量

```
echo $PATH
```

- cp 到目录

```
sudo cp consul /usr/local/bin
```

- 查看安装 consul

```
consul
```

### consul 运行

```
consul agent -dev
```

- 在另一个终端运行`consul members`，可以看到 Consul 集群的成员。 应该只看到一个成员（你自己）
- members 命令的输出基于 gossip 协议，并最终一致。 也就是说，在任何时候，当地代理所看到的可能与服务器上的状态不完全一致。 要获得完全一致，请使用 HTTP API 再将 HTTP 请求转发给 Consul 服务器

```
curl localhost:8500/v1/catalog/nodes
```

- 除了 HTTP API 之外，还可以使用 DNS 接口查询节点。 请注意，必须确保将 DNS 查找默认情况下指向在端口 8600 上运行的 Consul 代理的 DNS 服务器。 DNS 条目的格式（如“Armons-MacBook-Air.node.consul”）将在后面详细介绍

```
dig @127.0.0.1 -p 8600 localhost.localdomain.node.consul
```

### 停止 Agent

可以使用 Ctrl-C（中断信号）正常停止代理。 中断代理之后，您应该看到它离开集群并关闭。

### 注册服务

1. 服务定义

```
sudo mkdir /etc/consul.d
echo '{"service": {"name": "web", "tags": ["rails"], "port": 80}}'  | sudo tee /etc/consul.d/web.json
consul agent -dev -config-dir=/etc/consul.d
```

2. 查询一个服务

```
# 使用 DNS API
[root@local13 ~]# dig @127.0.0.1 -p 8600 web.service.consul
...
;; QUESTION SECTION:
;web.service.consul.        IN  A
;; ANSWER SECTION:
web.service.consul. 0   IN  A   127.0.0.1

# 使用 DNS API 查找 SRV 记录
[root@local13 ~]# dig @127.0.0.1 -p 8600 web.service.consul SRV
...
;; QUESTION SECTION:
;web.service.consul.        IN  SRV
;; ANSWER SECTION:
web.service.consul. 0   IN  SRV 1 1 80 local13.node.dc1.consul.
;; ADDITIONAL SECTION:
local13.node.dc1.consul. 0  IN  A   127.0.0.1
...

# 使用 HTTP API 查询
[root@local13 ~]# curl http://localhost:8500/v1/catalog/service/web
# 健康检查
[root@local13 ~]# curl 'http://localhost:8500/v1/health/service/web?passing'
```

### Consul 集群

1. 创建 node1，consul server

```
$ consul agent -server -bootstrap-expect=1  \
-data-dir=/tmp/consul \
-node=agent-one -bind=192.168.10.47 \
-enable-script-checks=true -config-dir=/etc/consul.d \
-client 0.0.0.0 -ui
# -node：节点的名称
# -bind：绑定的一个地址，用于节点之间通信的地址，可以是内外网，必须是可以访问到的地址
# -server：这个就是表示这个节点是个SERVER
# -bootstrap-expect：这个就是表示期望提供的SERVER节点数目，数目一达到，它就会被激活，然后就是LEADER了
# -dc：指明数据中心的名字
# -client 0.0.0.0 -ui：启动UI（为了方便后续的UI访问）
```

2. 创建 node2,consul client

```
$ consul agent -data-dir=/tmp/consul \
-node=agent-two   \
-bind=192.168.10.47 -enable-script-checks=true \
-config-dir=/etc/consul.d \
-ui
```

3. 加入集群

node1 ip 加入集群

```
consul join 192.168.10.47
consul members
```

4. 查询节点

```
dig @127.0.0.1 -p 8600 agent-two.node.consul
```

### KV 数据

类似 Redis，一般也就用来做服务配置。
简单了解下命令就好：

```
consul kv put redis/config/minconns 1
consul kv put redis/config/minconns 2 # 更新
consul kv get redis/config/minconns
consul kv delete redis/config/minconns
consul kv delete -recurse redis # 批量删除
```

### WEB UI

访问下：
http://192.168.10.47:8500/ui

栏目解析：就是上面操作生成的一些东西

1. services：放置服务
2. nodes：放置 consul 节点
3. key/value：放置一些配置信息
4. dc1：配置数据中心
