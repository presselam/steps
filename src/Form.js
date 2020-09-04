import React from 'react';
import { withRouter } from 'react-router-dom';
import './App.css'


class Form extends React.Component {
  constructor(props){
    super(props);

    console.log(JSON.stringify(this.props));

    this.state = {
      wager: 40,
      eligible: '',
      total: ''
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
    event.preventDefault();
    const wager = parseInt(this.state.wager);
    const total = parseInt(this.state.total);
    const eligible = parseInt(this.state.eligible);

this.props.history.push(`/${wager}/${total}/${eligible}`);
//    window.location.href = '/'+wager+'/'+total+'/'+eligible;

  }

//  componentDidMount(){
//    if( this.state.wager != null 
//     && this.state.total != null 
//     && this.state.eligible != null ){
//    this.handleSubmit(new Event('Submit'));
//    }
//  }
  
  render() {
    return (
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
    );
  }
}

export default withRouter(Form);

