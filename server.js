// Comments might be only partialy accurate
import config from './config';
import apiRouter from './api/index';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const server = express();
server.use(bodyParser.json());

// Tell server to use sass for specially formated css
server.use(sassMiddleware({
  src: path.join(__dirname,'sass'),
  dest: path.join(__dirname,'public')
}));

// Using ejs for the view engine
server.set('view engine', 'ejs');

import serverRender from './serverRender';

// Server side rendering function
server.get(['/','/contest/:contestId'], (req, res) => {
  serverRender()
    .then(({initialMarkup, initialData}) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

// Use the '/api' route for our api javascript (./api/index.js)
server.use('/api', apiRouter);
server.use(express.static('public'));

// Open server on configured port and host address
server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});

//////////// Start Server Control Logic Section //////////

//  Function To Get Data From Seonsors, POST to API
const sensorData = () => {
  
  // Read sensor data from GPIO pins
  
  // Validate sensor data

  // POST to server API

};

// Turn pump on or off
const setPump = () => {

};

// Depending on settings, turn pump on or off
const pumpLogic = () => {

};

//  Function To Get Data From API
const arrifyData = (apiData) => {
  return{
    arrData: Object.keys(apiData.graphData).map((i) => {
      return apiData.graphData[i];
    })
  };
};

setInterval(() => {
  axios.get(`${config.serverUrl}/api/data`)
    .then(resp => {
      let data = arrifyData(resp.data);
      //console.log(data);
    });
},5000);
