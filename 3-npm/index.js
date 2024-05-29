const express = require('express');
const app = express();
app.use(express.json());
// express.json() 会返回一个middelware function - 中间件
// 帮我们把request里的body的数据，转换为js的object，然后赋值给req.body在这个属性
// global middleware

// app - application
// get - http method
// (path - without query, callback function - route handler)
app.get('/', function (req, res) {
  // res.send({ message: 'Hello World' });
  // res.json([1.2, 3]);
  // res.sendStatus(204);

  res.status(201).json([1, 2, 3]);
  // API server
});

// app.post()
// app.put()
// app.patch()
// app.delete()

// app.use('/user', callback function);
// 所有以path开头的路径，无论任何method，都匹配

// {userId}
// /users/:userId
// /users

/**
 * 如何从request里获取数据
 * 1. req.params (route params - url中的变量)                   -> GET, PUT, DELETE, PATCH (POST - /users/:userId/notes)
 *    /users/:userId   （userId 是js中的变量名，注意一一对应）
 * 2. req.query                                               -> GET (查询)
 *    /users/123?age=10  (age 是js中的变量名，也是一一对应，注意大小写)
 * 3. req.body                                                -> POST, PUT, PATCH
 *    request body里的数据 （body-parser) app.use(express.json());
 *
 * from headers (authroization token)
 */
app.get('/users/:id', (req, res) => {
  // res.json({
  //   params: req.params,
  //   query: req.query,
  //   body: req.body,
  // });
});
const m1 = (req, res, next) => {};
const m2 = (req, res, next) => {};

app.use('/v1/users', m1, m2);
// ==
app.use('/v1/users', m1);
app.use('/v1/users', m2);

// 3001, 4000
app.listen(3000, () => {
  console.log('server listening on port 3000');
});

// const res = {
//   code: 200,
//   status(code) {
//     this.code = code;
//     return this;
//   },
//   json() {
//     console.log(this.code);
//   },
// };

// res.status(400).json();

// GET /v1/users
// app.get('/v1', m1);
// app.get('/v1/users', m2);
// app.get('/v1/users', m3);
// app.post('/v1/users', m4);

// app.get('/users/:id', (req, res, next) => {
//   if () {
//     res.json({
//       params: req.params,
//       query: req.query,
//       body: req.body,
//     });
//   } else {
//     next();
//   }
// });
