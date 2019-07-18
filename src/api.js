// Interface between components and server
// Axios, a promise based HTTP client 
import axios from 'axios';

// Get information on a contest at contestId endpoint
export const fetchContest = contestId => {
  return axios.get(`/api/contests/${contestId}`)
    .then(resp => resp.data);
};

// Get the contest list for main page
export const fetchContestList = () => {
  // eslint-disable-next-line quotes
  return axios.get(`/api/contests/`)
  .then(resp => resp.data.contests);
};

// Get the proposed names for each contest
export const fetchNames = nameIds => {
  return axios.get(`/api/names/${nameIds.join(',')}`)
  .then(resp => resp.data.names);
};

// Get the pool heater data
export const fetchGraphData = () => {
  // eslint-disable-next-line quotes
  return axios.get(`/api/data/`)
    .then(resp => resp.data.contents);
};

// Post a new proposed name
export const addName = (newName, contestId) => {
  return axios.post('/api/names', { newName, contestId})
    .then(resp => resp.data);
};

export const addRecord = (pumpStatus, Tpool, Tair, Theat) => {
  return axios.post('api/data', {pumpStatus, Tpool, Tair, Theat})
    .then(resp => resp.data);
};