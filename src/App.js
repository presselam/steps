import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Form from './Form.js';
import Result from './Result.js';
import './App.css'


export default class MainApp extends React.Component {
  constructor(props){
    super(props);

    console.log(JSON.stringify(props));

  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <nav>
            <Form />
          </nav>  
          <hr className='divider'/ >
          <Switch>
            <Route path="/:wager/:total/:eligible" children={<Result />} />
          </Switch>  
        </div>  
      </BrowserRouter>
    );
  }
}
