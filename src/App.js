import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CharBackground from './char-background'
import CharSpells from './char-spells'
import {changeClass} from './actions'
import {connect} from 'react-redux';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spells: '',
      classes: ''
    }

    // this.onClassChange = this.onClassChange.bind(this);
  }

  componentDidMount() {
    axios.get("/dndapi/spells")
      .then((response) => {
        let spells = response.data;
        // let spells = response.data.results.map((spell) =>
        //   <li key={spell.name}>{spell.name}</li>
        // );
        // console.log(spells);
        this.setState((prevState, props) => ({
          spells: spells
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get("/dndapi/classes")
      .then((response) => {
        let classes = response.data.results;
        // let classes = response.data.results.map((cl) =>
        //   <li key={cl.name}>{cl.name}</li>
        // );
        // console.log(classes);

        this.props.changeClass(classes[0].name);

        this.setState((prevState, props) => ({
          classes: classes
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // onClassChange(cl) {
  //   console.log(cl);
  //   this.setState((prevState, props) => ({
  //     activeClass: cl
  //   }));
  // }

  render() {
    return (
      <div className="App">
        <div className="row" style={{border: "1px solid #ccc", "marginTop": "10px"}}>
          <div className="col-sm-3" style={{"borderRight": "1px solid #ccc", padding: "15px"}}>
            {this.state.classes.length > 0 &&
              <CharBackground classes={this.state.classes} onClassChange={this.onClassChange} />
            }
          </div>
          <div className="col-sm-9">
            <p>Attributes go here</p>
          </div>
        </div>
        {this.state.spells.length > 0 &&
          <CharSpells spells={this.state.spells} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    changeClass: cl => {
      dispatch(changeClass(cl));
    }
  }
};

const CharSheet = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default CharSheet;
