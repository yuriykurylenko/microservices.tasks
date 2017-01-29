const restify = require('restify');
const db = require('./db.js');

const server = restify.createServer();
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());

db.connect();

server.get('/tasks', (req, res, next) => {
  db.getTasks().then(
    tasks => {
      res.send(200, tasks);
      next();
    },
    err => res.send(500, tasks)
  );
});

server.get('/tasks/my', (req, res, next) => {
  db.getTasks({ assignee: Number(req.params.userId) }).then(
    tasks => {
      res.send(200, tasks);
      next();
    },
    err => res.send(500, tasks)
  );
});

server.post('/tasks/my', (req, res, next) => {
  var body = req.body;
  body.assignee = body.userId;
  delete body.userId;

  db.addTask(body).then(
    task => {
      res.send(201, task);
      next();
    },
    err => res.send(500)
  );
});

server.listen(process.env.PORT, 'localhost', () => {
    console.log('%s listening at %s', server.name, server.url);
});
