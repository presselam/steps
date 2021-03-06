import './App.css'

import React from 'react';
import {withRouter} from 'react-router-dom';

class Form extends React.Component {
  constructor(props) {
    super(props);

    var params = this.props.location.pathname.split('/').filter(
        (value) => {return value !== ''});

    const state = {wager : 40, total : '', eligible : ''};

    for (var i = 0; i < params.length; i++) {
      switch (i) {
      case 0:
        state.wager = params[i];
        break;
      case 1:
        state.total = params[i];
        break;
      case 2:
        state.eligible = params[i];
        break;
      default:
        console.log('should not have gotten here');
        break;
      }
    }
    this.state = state;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'wagerInput') {
      this.setState({wager : event.target.value});
    }
    if (event.target.id === 'totalInput') {
      this.setState({total : event.target.value});
    }
    if (event.target.id === 'eligibleInput') {
      this.setState({eligible : event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const wager = parseInt(this.state.wager);
    const total = parseInt(this.state.total);
    const eligible = parseInt(this.state.eligible);

    if (eligible > total) {
      alert("Eligible players must be less than or equal to the Total players");
    } else {
      this.props.history.push(`/${wager}/${total}/${eligible}`);
    }
  }

  render() {
    return (
        <div className = "Form"><form onSubmit = {this.handleSubmit}>
        <table border = '0'><tbody><tr><td>Wager: <
            /td><td><input id='wagerInput' type="text" value={this.state.wager} onChange={this.handleChange}/>
        </td></tr><tr><td>Total Players: <
            /td><td><input id='totalInput' type="text" value={this.state.total} onChange={this.handleChange}/>
        </td></tr><tr><td>Eligible Players: <
            /td><td><input id='eligibleInput' type="text" value={this.state.eligible} onChange={this.handleChange}/>
        </td></tr><tr><td colSpan = '2'>
        <input type = "submit" value = "Compute" /></td></tr>
        </tbody>
            </table></form>
      </div>);
  }
}

export default withRouter(Form);
