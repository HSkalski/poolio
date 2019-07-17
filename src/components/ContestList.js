import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

// When on home page, render a list of <ContestPreview ... /> components
const ContestList = ({ contests, onContestClick }) => (
  <div className="ContestList">
    {Object.keys(contests).map(contestId =>
      <ContestPreview 
      key={contestId} 
      onClick={onContestClick}
      {...contests[contestId]} />
    )}
  </div>
);

ContestList.propTypes = {
  contests: PropTypes.object,
  onContestClick: PropTypes.func.isRequired,
};

export default ContestList;