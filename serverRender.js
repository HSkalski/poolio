//fetch data from api
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

// Takes a contestId and returns the Api url for it
// if no contestId is passed, return the information for full contests
const getApiUrl = contestId => {
  if(contestId){
    return `${config.serverUrl}/api/contests/${contestId}`;
  }
  return `${config.serverUrl}/api/data`;
};

// Initial data for rendering
// if there is a contestId passed -> return the current contest id and fill contests object with that object? <- ???
// else -> we are on home page and return list of contests
const getInitialData = (contestId, apiData) => {
  if(contestId){
    return{
      currentContestId: apiData._id,
      contests:{
        [apiData._id]: apiData
      }
    };
  }
  return{
    contests: apiData.contests,
    arrData: Object.keys(apiData.graphData).map((i) =>{
      return apiData.graphData[i];
    })
  };
};

// Main server side rendering function
// returns App component rendered with initial data for current uri/l
const serverRender = (contestId) =>
  axios.get(getApiUrl(contestId))
    .then(resp => {
      const initialData = getInitialData(contestId, resp.data);
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData: initialData
      };
    });

export default serverRender;