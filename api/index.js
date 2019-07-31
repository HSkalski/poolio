// Main /API

import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import config from '../config';

// Open connection to mongodb server
let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);
  console.info('MongoClient connected to db');
  mdb = db;
});

// uses express's routing capabilities
const router = express.Router();

// '/contests' endpoint adds contests to an array from
// the mdb collection called contests, if there aren't any 
// more, return the list
router.get('/contests', (req, res) => {
  let contests = {};
  mdb.collection('contests').find({})
    .project({
      categoryName: 1,
      contestName: 1
    })
    .each((err, contest) => {
      assert.equal(null, err);
      if (!contest) { //no more contests
        res.send({ contests });
        return;
      }
      contests[contest._id] = contest;
    });
});

// '/data' endpoint adds data to an array from
// the mdb collection called data, if there aren't any 
// more, return the list
router.get('/data', (req, res) => {
  let graphData = {};
  mdb.collection('data').find({})
    .each((err, data) => {
      assert.equal(null, err);
      if (!data) { //no more contests
        res.send({ graphData });
        return;
      }
      graphData[data._id] = data;
    });
});

// returns list of names that corespond with a contest
router.get('/names/:nameIds', (req, res) => {
  const nameIds = req.params.nameIds.split(',').map(ObjectID);
  let names = {};
  mdb.collection('names').find({ _id: { $in: nameIds } })
    .each((err, name) => {
      assert.equal(null, err);
      if (!name) { //no more names
        res.send({ names });
        return;
      }
      names[name._id] = name;
    });
});

// return a contest at given contestId, else send 404 not found page
router.get('/contests/:contestId', (req, res) => {
  mdb.collection('contests')
    .findOne({ _id: ObjectID(req.params.contestId) })
    .then(contest => res.send(contest))
    .catch(console.error)
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

// post new name to the names collection, 
// link it to the 'contestId' and give it name 'name'
router.post('/names', (req, res) => {
  const contestId = ObjectID(req.body.contestId);
  const name = req.body.newName;
  // should validate name ...but ehh
  mdb.collection('names').insertOne({ name }).then(result =>
    mdb.collection('contests').findAndModify(
      { _id: contestId },
      [],
      { $push: { nameIds: result.insertedId } },
      { new: true }
    ).then(doc =>
      res.send({
        updatedContest: doc.value,
        newName: { _id: result.insertedId, name }
      })
    )
  ).catch(error => {
    console.error(error);
    res.status(404).send('Bad Request');
  });
});

// post data record to the names collection, 
router.post('/data', (req, res) => {
  //const contestId = ObjectID(req.body.contestId);
  //const name = req.body.newName;
  const toggleStatus = Number(req.body.toggleStatus);
  const pumpStatus = Number(req.body.pumpStatus);
  const Tpool = Number(req.body.Tpool);
  const Tair = Number(req.body.Tair);
  const Theat = Number(req.body.Theat);
  const Ttarget = Number(req.body.Ttarget);
  //console.log('Ttarget: ',Ttarget);
  let time = new Date();
  time = time.toLocaleString();
  //console.log(time);
  // should validate data ...but ehh

  mdb.collection('data')
    .insertOne({ toggleStatus, pumpStatus, Tpool, Tair, Theat, Ttarget, time})
    .then((result) => {
      res.send({
        // _id: result.insertedId,
        // pumpStatus: pumpStatus,
        // Tpool: Tpool,
        // Tair: Tair,
        // Theat: Theat,
        // time: time,
        status: result
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

// Export router so that server can use it
export default router;
