import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

if(typeof window !== 'undefined'){
  ReactDOM.render(
    <App initialData={window.initialData} />,
    document.getElementById('root')
  );
}

