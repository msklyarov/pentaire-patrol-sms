import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import RootContainer from './routes/root';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <RootContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
