import * as logic from './logic';

//Functions for data collection loop

// Gather data and send it through logic loop, return what should be 
// set to the database
export const loop = (toggleStatus) => {
  //for now, just return fake generated data
  const fakeData = logic.fakeData();
  const pumpStatus = logic.pumpLogic(toggleStatus, fakeData.pool_temp, fakeData.pump_temp);
  return {
    ...fakeData,
    pumpStatus
  };
};