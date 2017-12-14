import React, { Component } from 'react';
import {connect} from 'react-redux';
import './char-spells.css';
import SpellBox from './spell-box'

class LevelSpellsComponent extends Component {
  state = {
    show: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeClass !== nextProps.activeClass) {
      this.setState((prevState, props) => ({
        show: false
      }));
    }
  }

  clickedDropdown = (event) => {
    this.setState((prevState, props) => ({
      show: !prevState.show
    }));
  }

  render() {
    if (!this.state.show) {
      return (
        <div>
          <p className="spell-levels-header" onClick={this.clickedDropdown}>Level {this.props.level} Spells ({this.props.spells.length}) <i className="fa fa-caret-down" /></p>
        </div>
      )
    } else {
      return (
        <div>
          <p className="spell-levels-header" onClick={this.clickedDropdown}>Level {this.props.level} Spells ({this.props.spells.length}) <i className="fa fa-caret-down" /></p>
          {this.props.spells.map((spell) =>
            <SpellBox key={spell.name} spell={spell} />
          )}
        </div>
      )
    }
  }
}

const mapStateToProps2 = state => {
  return {
    activeClass: state.activeClass
  }
};

const mapDispatchToProps2 = dispatch => {
  return {}
};

const LevelSpells = connect(
  mapStateToProps2,
  mapDispatchToProps2
)(LevelSpellsComponent)

class CharSpellsComponent extends Component {

  render() {
    let filteredSpells = this.props.spells.filter((spell) => {
      if (spell.classes) {
        let classesUsable = spell.classes.map((cl) => {
          return cl.name;
        }).filter((cl) => {
          return cl;
        });
        return classesUsable.indexOf(this.props.activeClass) > -1
      } else {
        return false;
      }
    });

    let spellsByLevel = {
      indexes: []
    };

    for (let spell of filteredSpells) {
      if (!spellsByLevel[spell.level]) {
        spellsByLevel[spell.level] = [spell];
        spellsByLevel.indexes.push(spell.level);
      } else {
        spellsByLevel[spell.level].push(spell);
      }
    }
    spellsByLevel.indexes = spellsByLevel.indexes.sort();

    let orderedSpellElements = [];

    for (let idx of spellsByLevel.indexes) {
      orderedSpellElements.push(
        <p>Level {idx}</p>
      );
      for (let spell of spellsByLevel[idx]) {
        orderedSpellElements.push(
          <p key={spell.name}>{spell.name} (Level {spell.level})</p>
        )
      }
    }

    const filteredSpellElements = filteredSpells.map((spell) =>
      <li key={spell.name}>{spell.name} (Level {spell.level})</li>
    );

    if (filteredSpellElements.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-12" style={{"padding": "15px"}}>
            <p>Spell Count: {filteredSpellElements.length}</p>
            {spellsByLevel.indexes.map((idx) =>
              <LevelSpells key={idx} level={idx} spells={spellsByLevel[idx]} />
            )}
          </div>
        </div>
      );      
    } else {
      return (
        <div className="row">
          <div className="col-sm-12" style={{"padding": "15px"}}>
            <p>No spells available for <b>{this.props.activeClass}</b> class</p>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    activeClass: state.activeClass
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

const CharSpells = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharSpellsComponent)

export default CharSpells;
