import './App.css'

import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Form from './Form.js';
import Result from './Result.js';

export default class MainApp extends React.Component {
  //  constructor(props){
  //    super(props);
  //  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <nav>
            <Form />
          </nav>
          <hr className='divider'/>
          <Switch>
            <Route exact path="/:wager/:total/:eligible" children={ <Result /> } />
          </Switch>
          <Switch>
            <Route exact path="/:wager/:total" children={ <Result /> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
