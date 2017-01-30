const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const collectionName = 'tasks';

module.exports = {
  connect() {
    this.connected = new Promise((resolve, reject) => {
      MongoClient.connect(process.env.MONGO_URL, (err, db) => {
        if (err !== null) {
          console.log('connection error', error);
          reject(error);
          return;
        }

        console.log("Connected successfully to server");
        resolve(db);
      });
    });
  },

  getTasks(filter) {
    filter = filter || {};
    return new Promise((resolve, reject) => {
      this.connected.then(db => {
        db.collection(collectionName).find(filter, { '_id': false }).toArray((err, docs) => {
          if (err !== null) {
            reject(err);
            return;
          }
          resolve(docs);
        });
      });
    });
  }
};
