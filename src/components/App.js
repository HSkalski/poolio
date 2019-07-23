import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
//import ContestList from './ContestList';
//import Contest from './contest';
import * as api from '../api';
import * as logic from '../logic';
import * as control from '../controlLoop';
import DataPanel from './DataPanel';
import ControlPanel from './ControlPanel';
import GraphPanel from './GraphPanel';
import ManualPanel from './ManualPanel';

// Window history, forward button
// const pushState = (obj, url) =>
//   window.history.pushState(obj, '', url);

// Window history, back button
// const onPopState = handler => {
//   window.onpopstate = handler;
// };

//Main component, controls whats on screen
class App extends React.Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired
  };
  // Initially set state using server rendering
  state = this.props.initialData;
  constructor(props) {
    super(props);
    this.state = {
      arrData: this.state.arrData,
      functionSelected: 'off'
    };
  }

  // What to do once component is on screen
  componentDidMount() {
    // onPopState((event) => {
    //   this.setState({
    //     currentContestId: (event.state || {}).currentContestId
    //   });
    // });

    // this.setState({
    //   arrData: Object.keys(this.state.graphData).map((i) =>{
    //     return this.state.graphData[i];
    //   })
    // });

    // this.setState({
    //   functionSelected:'off',
    // });

    // this.interval = setInterval(() => {
    //   let toggleStatus;
    //   if(this.state.functionSelected == 'on')
    //     toggleStatus = 1;
    //   else if(this.state.functionSelected == 'off')
    //     toggleStatus = 0;
    //   else if(this.state.functionSelected == 'auto')
    //     toggleStatus = 2;
    //   let fakeData = control.loop(toggleStatus);
    //   console.log('Posting new data');
    //   this.addRecord(fakeData.pool_temp, fakeData.air_temp, fakeData.pump_temp);
    // } ,5000);
  }
  // What to do when component is leaving
  componentWillUnmount() {
    // Clear history state
    //onPopState(null);

    //clearInterval(this.interval);
  }

  getToggleStatus = () => {
    if (this.state.functionSelected === 'on')
      return 1;
    else if (this.state.functionSelected === 'off')
      return 0;
    else if (this.state.functionSelected === 'auto')
      return 2;
  }
  // Add a new record, call api, set state (old way)
  addRecordOLD = (toggleStatus, pumpStatus, Tpool, Tair, Theat) => {
    api.addRecord(toggleStatus, pumpStatus, Tpool, Tair, Theat).then(resp =>
      this.state.arrData.push({
        _id: resp._id,
        pumpStatus: resp.pumpStatus,
        Tpool: resp.Tpool,
        Tair: resp.Tair,
        Theat: resp.Theat,
        time: resp.time,
      })
    )
      .catch(console.error);
    this.forceUpdate();
  }

  // Add a new record, call api, set state
  addRecord = (toggleStatus, pumpStatus, Tpool, Tair, Theat) => {
    api.addRecord(toggleStatus, pumpStatus, Tpool, Tair, Theat).then(resp => {
      if (resp.status.ok === 1) {
        api.fetchGraphData().then(newData => {
          this.setState({
            arrData: Object.keys(newData.graphData).map((i) => {
              return newData.graphData[i];
            })
          });
        });
      }
    })
      .catch(console.error);
    this.forceUpdate();
  }

  functionToggleChange = (val) => {
    this.setState({
      functionSelected: val,
    }, () =>
        console.log('state', this.state.functionSelected)
    );
  }

  // What contest is on screen
  // currentContest() {
  //   return this.state.contests[this.state.currentContestId];
  // }

  // What should the header be
  //    If not on homepage -> page name
  //    else -> Poolio
  pageHeader() {
    return '< POOL-io />';
  }
  pageFooter() {
    return 'POOLio is a web app made to monitor and control a pool heater';
  }

  // Find a proposed name by its nameId, while loading, replace with '...'
  // lookupName = (nameId) => {
  //   if (!this.state.names || !this.state.names[nameId]) {
  //     return {
  //       name: '...'
  //     };
  //   }
  //   return this.state.names[nameId];
  // };

  // if app is in contest -> render that contest
  // else -> render the contest list
  // currentContent() {
  //   if (this.state.currentContestId) {
  //     return <Contest
  //       contestListClick={this.fetchContestList}
  //       fetchNames={this.fetchNames}
  //       lookupName={this.lookupName}
  //       addName={this.addName}
  //       {...this.currentContest()} />;
  //   }
  //   return <ContestList
  //     onContestClick={this.fetchContest}
  //     contests={this.state.contests} />;
  // }

  // What App renders (old: {this.currentContent()})
  render() {



    return (
      <div className="App" >
        <Header message={this.pageHeader()} />
        <DataPanel
          pumpStatus={this.state.arrData[this.state.arrData.length - 1].pumpStatus}
          Tpool={this.state.arrData[this.state.arrData.length - 1].Tpool}
          Tair={this.state.arrData[this.state.arrData.length - 1].Tair}
          Theat={this.state.arrData[this.state.arrData.length - 1].Theat}
          time={this.state.arrData[this.state.arrData.length - 1].time}
        />
        <ControlPanel functionSelected={this.state.functionSelected} functionToggleChange={this.functionToggleChange} />
        <ManualPanel getToggleStatus={this.getToggleStatus} addRecord={this.addRecord} />
        <GraphPanel
          //fetchGraphData={this.fetchGraphData}
          arrData={this.state.arrData} />
        <Footer message={this.pageFooter()} />
      </div>
    );
  }
}


// --sets default values for props--
// App.defaultProps = {
//   headerMessage: 'Hello!'
// };

export default App;