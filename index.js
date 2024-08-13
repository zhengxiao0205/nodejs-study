import BodyParser from '@koa/bodyparser';
import Cors from '@koa/cors';
import Router from '@koa/router';
import db from './models/index.js';
import koa from 'koa';

const host = 'localhost';
const port = 8080;

const app = new koa(); // 创建一个 Koa 实例

app.use(BodyParser()); // 解析post请求的json或url请求体
app.use(Cors()); // 允许跨域请求

const router = new Router();

// 创建用户
router.post('/users', async (ctx) => {
  const { username, password, name } = ctx.request.body;
  const user = await db.User.create({ username, password, name });
  ctx.body = user;
});

// 获取所有用户
router.get('/users', async (ctx) => {
  const users = await db.User.findAll();
  ctx.body = users;
});

// 获取单个用户
router.get('/users/:id', async (ctx) => {
  const user = await db.User.findByPk(ctx.params.id);
  if (user) {
    ctx.body = user;
  } else {
    ctx.status = 404;
    ctx.body = { message: 'User not found' };
  }
});

// 更新用户
router.put('/users/:id', async (ctx) => {
  const { username, password, name } = ctx.request.body;
  const updated = await db.User.update({ username, password, name }, {
    where: { id: ctx.params.id }
  });
  if (updated[0] > 0) {
    ctx.body = { message: 'User updated' };
  } else {
    ctx.status = 404;
    ctx.body = { message: 'User not found' };
  }
});

// 删除用户
router.delete('/users/:id', async (ctx) => {
  const deleted = await db.User.destroy({
    where: { id: ctx.params.id }
  });
  if (deleted > 0) {
    ctx.body = { message: 'User deleted' };
  } else {
    ctx.status = 404;
    ctx.body = { message: 'User not found' };
  }
});

try {
  await db.sequelize.sync({ alter: true });
  await db.sequelize.authenticate();

  console.log('所有模型已成功同步，表已重新创建，数据库已连接成功');

  app.use(router.routes()); // 将定义在 router 对象中的路由规则添加到 app 实例中

  // 启动服务器并在指定的 host 和 port 上监听连接请求
  app.listen(port, host, () => {
    console.log(`服务器已启动:http://${host}:${port}`);
  });
} catch (err) {
  console.error('数据库连接失败:', err);
}
