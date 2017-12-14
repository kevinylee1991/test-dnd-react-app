import React, { Component } from 'react';
import './spell-box.css';

class SpellBox extends Component {
  state = {
    show: false
  }

  clickedDropdown = (event) => {
    this.setState((prevState, props) => ({
      show: !prevState.show
    }));
  }

  render() {
    let spell = this.props.spell;

    spell.descHtml = spell.desc.map((desc) =>
      <p key={desc}>{desc}</p>
    );
    try {
      spell.componentsString = spell.components.join(', ');
    } catch (e) {
      spell.componentsString = spell.components;
    }

    return (
      <div className="spell-box" key={spell.name}>
        <p className="spell-name" onClick={this.clickedDropdown}>{spell.name} <i className="fa fa-caret-down"></i></p>
        { this.state.show &&
          <div className="spell-details">
            {spell.descHtml}
            <div className="row" style={{"marginTop": "20px"}}>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 spell-attr">
                <b>Level:</b> {spell.level}
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 spell-attr">
                <b>Components:</b> {spell.componentsString}
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 spell-attr">
                <b>Ritual:</b> {spell.ritual}
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 spell-attr">
                <b>Material:</b> {spell.material || 'none'}
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 spell-attr">
                <b>Cast Time:</b> {spell.casting_time}
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 spell-attr">
                <b>Concentration:</b> {spell.concentration}
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 spell-attr">
                <b>Duration:</b> {spell.duration}
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 spell-attr">
                <b>Range:</b> {spell.range}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default SpellBox;
