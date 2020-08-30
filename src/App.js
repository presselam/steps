import React from 'react';
import qs from 'query-string';
import Results from './results.js';
import './App.css'


class RunnerForm extends React.Component {
  constructor(props){
    super(props);

    const config = qs.parse(window.location.search);

    this.state = {
      wager: config.w == null ? 40 : config.w,
      eligible: config.e == null ? '' : config.e,
      total: config.t == null ? '' : config.t,
      dataSet: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if( event.target.id === 'wagerInput' ){
    this.setState({wager: event.target.value});
    }
    if( event.target.id === 'totalInput' ){
    this.setState({total: event.target.value});
    }
    if( event.target.id === 'eligibleInput' ){
    this.setState({eligible: event.target.value});
    }
  }

  handleSubmit(event) {
    const dataSet = {
     wager: parseInt(this.state.wager),
     total: parseInt(this.state.total),
     eligible: parseInt(this.state.eligible),
    };

    this.setState({'dataSet': dataSet});
    event.preventDefault();
  }

  componentDidMount(){
    if( this.state.wager != null 
     && this.state.total != null 
     && this.state.eligible != null ){
    this.handleSubmit(new Event('Submit'));
    }
  }
  
  render() {
//    alert("app.render(" + JSON.stringify(this.state.dataSet) + ")");
    return (
      <div className="App">
        <div className="Form">
          <form onSubmit={this.handleSubmit}>
            <table border='0'>
              <tbody>
              <tr><td>Wager:</td><td><input id='wagerInput' type="text" value={this.state.wager} onChange={this.handleChange}/></td></tr>
              <tr><td>Total Players:</td><td><input id='totalInput' type="text" value={this.state.total} onChange={this.handleChange}/></td></tr>
              <tr><td>Eligible Players:</td><td><input id='eligibleInput' type="text" value={this.state.eligible} onChange={this.handleChange}/></td></tr>
              <tr><td colSpan='2'><input type="submit" value="Compute"/></td></tr>
              </tbody>
            </table>
          </form>
        </div>
        <hr className='divider'/ >
        <Results dataSet={this.state.dataSet} />
      </div>
    );
  }
}

export default RunnerForm;
