import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './contest';
import * as api from '../api';
import DataPanel from './DataPanel';
import ControlPanel from './ControlPanel';
import GraphPanel from './GraphPanel';

// Window history, forward button
const pushState = (obj, url) =>
  window.history.pushState(obj,'',url);

// Window history, back button
const onPopState = handler => {
  window.onpopstate = handler;
};

//Main component, controls whats on screen
class App extends React.Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired
  };
  // Initially set state using server rendering
  state = this.props.initialData;
  
  // What to do once component is on screen
  componentDidMount(){
    onPopState((event) => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      });
    });
  }
  // What to do when component is leaving
  componentWillUnmount(){
    // Clear history state
    onPopState(null);
  }
  // Find contest by Id string, call the api layer, set state
  fetchContest = (contestId) => {
    pushState(
      {currentContestId: contestId },
      `/contest/${contestId}`,
    );

    api.fetchContest(contestId).then(contest =>{
      this.setState({
        currentContestId: contest._id,
        contests: {
          ...this.state.contests,
          [contest._id]: contest
        }
      });
    });
  };
  
  // Get list of contests for main page from api layer, set the state 
  fetchContestList = () => {
    pushState(
      {currentContestId: null },
      // eslint-disable-next-line quotes
      `/`,
    );

    api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests
      });
    });
  };

  // Get list of name candidates from api layer, set state
  fetchNames = (nameIds) => {
    if(nameIds.length === 0){
      return;
    }
    api.fetchNames(nameIds).then(names => {
      this.setState({
        names
      });
    });
  };

  // Add a new name, call to api, set state
  addName = (newName, contestId) => {
    api.addName(newName, contestId).then(resp =>
      this.setState({
        contests: {
          ...this.state.contests,
          [resp.updatedContest._id]: resp.updatedContest
        },
        names: {
          ...this.state.names,
          [resp.newName._id]: resp.newName
        }
      })
    )
    .catch(console.error);
  };

  // What contest is on screen
  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }

  // What should the header be
  //    If not on homepage -> page name
  //    else -> Poolio
  pageHeader() {
    if(this.state.currentContestId){
      return this.currentContest().contestName;
    }
    return '< POOL-io />';
  }
  
  // Find a proposed name by its nameId, while loading, replace with '...'
  lookupName = (nameId) => {
    if(!this.state.names || !this.state.names[nameId]){
      return {
        name: '...'
      };
    }
    return this.state.names[nameId];
  };

  // if app is in contest -> render that contest
  // else -> render the contest list
  currentContent() {
    if (this.state.currentContestId){
      return <Contest 
              contestListClick={this.fetchContestList}
              fetchNames={this.fetchNames}
              lookupName={this.lookupName}
              addName={this.addName}
              {...this.currentContest()}/>;
    } 
    return  <ContestList 
            onContestClick={this.fetchContest}
            contests={this.state.contests} />;
  }

  // What App renders (old: {this.currentContent()})
  render() {
    return (  
      <div className="App" >
        <Header message={this.pageHeader()} />
        <DataPanel />
        <ControlPanel />
        <GraphPanel />
      </div>
    );
  }
}


// --sets default values for props--
// App.defaultProps = {
//   headerMessage: 'Hello!'
// };

export default App;