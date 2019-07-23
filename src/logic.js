// Contains functions for pump logic for AUTO mode

// Takes the current webapp toggleSelection status, pool temperature, and pump temperature
// Returns if the pump should be on or off
export const pumpLogic = (toggleStatus, poolTemp, pumpTemp) => {
  // Overrides
  if(toggleStatus == '0' || toggleStatus === null)
    return 0;

  else if(toggleStatus == '1' )
    return 1;

  //Auto
  else if(toggleStatus == '2' ){
    //Simple heating loop, checks if pump temp is greater than pool temp
    console.log(poolTemp, pumpTemp);
    if(poolTemp < pumpTemp){
      console.log('Pump temp greater than pool temp');
      return 1;
    }
    else{
      console.log('Pump temp less than pool temp');
      return 0;
    }
  }

  //Error status
  else{
    console.error('Invalid Toggle Status: ',toggleStatus);
    return 0;
  }
};

export const fakeData = () => {
  //Generate random data to replace manual control within range
  //Return->
  //  Pool Temp: 80-90
  //  Pump Temp: 75-100
  //   Air Temp: 70-85
  
  const pool_temp = Math.floor(Math.random() * 11) + 80;
  const pump_temp = Math.floor(Math.random() * 26) + 75;
  const  air_temp = Math.floor(Math.random() * 16) + 70;
  const data = {

    pool_temp:pool_temp,
    pump_temp:pump_temp,
    air_temp:air_temp,
  };

  return data;
};
