import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeClass} from './actions'

class CharBackgroundComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };

    this.changedName = this.changedName.bind(this);
    // this.changedClass = this.changedClass.bind(this);
  }

  // componentDidMount() {
  //   // Set default class
  //   this.setState({class: this.props.classes[0].name});
  // }

  // changedClass(event) {
  //   this.props.onClassChange(event.target.value);
  // }

  changedName(event) {
    this.setState({name: event.target.value});
  }

  render() {
    const classOptions = this.props.classes.map((cl) =>
      <option key={cl.name} value={cl.name}>{cl.name}</option>
    );

    return (
      <div>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" type="text" value={this.state.name} onChange={this.changedName} />
        </div>
        <div className="form-group">
          <label>Class</label>
          <select className="form-control" value={this.props.activeClass} onChange={this.props.onClassChange}>
            {classOptions}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeClass: state.activeClass
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClassChange: cl => {
      dispatch(changeClass(cl.target.value));
    }
  }
};

const CharBackground = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharBackgroundComponent)

export default CharBackground;
