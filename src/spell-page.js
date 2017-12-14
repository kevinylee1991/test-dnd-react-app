import React, { Component } from 'react';
import axios from 'axios';
import SpellBox from './spell-box'
import './spell-page.css'

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

let filterSpellsByName = (spells, str) => {
  str = str.trim();
  return spells.filter(function(spell) {
    return spell.name.toLowerCase().indexOf(str.toLowerCase()) > -1;
  });
};

class SpellPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      spells: [],
      filteredSpells: []
    }
  }

  componentDidMount() {
    axios.get("/dndapi/spells")
      .then((response) => {
        let spells = response.data;
        let filteredSpells = filterSpellsByName(spells, this.state.search);
        this.setState({spells, filteredSpells});
      })
      .catch(function (error) {
        console.log(error);
      });

    this.debouncedSearch = debounce(() => {
      this.filterSpells();
    }, 200)
  }

  filterSpells = event => {
    let filteredSpells = filterSpellsByName(this.state.spells, this.state.search);
    this.setState({filteredSpells});
  }

  onChange = event => {
    this.setState({search: event.target.value});
    this.debouncedSearch();
  }

  render() {
    return (
      <div className="spell-page">
        <div className="search-box">
          <i className="fa fa-search search-icon" />
          <input className="form-control" type="text" value={this.state.search} onChange={this.onChange} placeholder="Search" />
        </div>
        {this.state.filteredSpells.map((spell) =>
          <SpellBox key={spell.name} spell={spell} />
        )}
        {this.state.filteredSpells.length < 1 && this.state.search &&
          <p style={{"marginTop": "10px"}}>No spells match this search query</p>
        }
      </div>
    );
  }
}

export default SpellPage;
