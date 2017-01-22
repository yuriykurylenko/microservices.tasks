const restify = require('restify');
const db = require('./db.js');

const server = restify.createServer();

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
  console.log(req.params);
  db.getTasks({ assignee: req.params.userId }).then(
    tasks => {
      res.send(200, tasks);
      next();
    },
    err => res.send(500, tasks)
  );
});

server.listen(process.env.PORT, 'localhost', () => {
    console.log('%s listening at %s', server.name, server.url);
});
