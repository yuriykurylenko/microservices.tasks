const restify = require('restify');
const db = require('./db.js');

const server = restify.createServer();
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());

db.connect();

server.get('/tasks', (req, res, next) => {
  const filter = req.params.userId ? { assignee: Number(req.params.userId) } : {};
  db.getTasks(filter).then(
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
