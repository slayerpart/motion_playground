import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motionAction } from './actions/MotionActions.js';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui-slider-label/Slider';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {
  MIN_STIFFINESS,
  MAX_STIFFINESS,
  DFLT_STIFFINESS,
  MIN_DAMPING,
  MAX_DAMPING,
  DFLT_DAMPING,
} from './constants/motion.js'

const styles = {
  margin: 12,
  radioButton: {
    marginBottom: 16,
  },
  subheader: {
    textTransform: 'capitalize',
  },
  labelStyleOuter: {
    width: '30px',
    height: '30px',
    borderRadius: '50% 50% 50% 0',
    background: 'rgb(0, 188, 212)',
    position: 'absolute',
    transform: 'rotate(-45deg)',
    top: '-40px',
    left: '-9px',
  },
  labelStyleInner: {
    transform: 'rotate(45deg)',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    top: '3px',
    right: '0px',
    fontSize: '10px',
    paddingLeft: '5px',
    paddingTop: '5px',
    fontWeight: 'bold',
  },
};


class Control extends Component {

  state = {
    stiffness: DFLT_STIFFINESS,
    damping: DFLT_DAMPING,
  };

  constructor() {
    super();
  }

  newStiffnessValue = (event, value) => {
    console.log("stiffness:", value);
    this.setState({stiffness: value});
    this.valuesToStore(value, null);
  };

  newDampingValue = (event, value) => {
    console.log("damping:", value);
    this.setState({damping: value});
    this.valuesToStore(null, value);
  }

  valuesToStore = (stiffness = null, damping = null) => {
    this.props.updateValues(
      stiffness||this.state.stiffness,
      damping||this.state.damping
    );
  }

  presetChecked = (event, value) => {
    let stiffness;
    let damping;
    switch(value){
      case 'noWobble':
        stiffness = 170;
        damping = 26;
        break;
      case 'gentle':
        stiffness = 120;
        damping = 14;
        break;
      case 'wobbly':
        stiffness = 180;
        damping = 12;
        break;
      case 'stiff':
        stiffness = 210;
        damping = 20;
        break;
      default:
        //keep current values
        return;
    }

    this.setState({stiffness: stiffness, damping: damping});
    this.valuesToStore(stiffness, damping);
  }

  render() {
    return (
   	<MuiThemeProvider>
    <div id="control">
      <h1 id="control-head">Control Area</h1>
   		<RadioButtonGroup id="control-radio" name="presets" defaultSelected="not_light" onChange={this.presetChecked}>
	      <RadioButton
	        value="noWobble"
	        label="noWobble"
	        style={styles.radioButton}
	      />
	      <RadioButton
	        value="gentle"
	        label="gentle"
	        style={styles.radioButton}
	      />
	      <RadioButton
	        value="wobbly"
	        label="wobbly"
	        style={styles.radioButton}
	      />
		  <RadioButton
	        value="stiff"
	        label="stiff"
	        style={styles.radioButton}
	      />
    	</RadioButtonGroup>
      <div id="control-slider">
        <p>Stiffiness</p>
        <Slider
          id='stiffness'
          className='slider'
          min={MIN_STIFFINESS}
          max={MAX_STIFFINESS}
          defaultValue={DFLT_STIFFINESS}
          value={this.state.stiffness}
          onChange={this.newStiffnessValue}
          step={1}
          label={
            <div style={styles.labelStyleOuter}>
              <div style={styles.labelStyleInner}>
                {this.state.stiffness}
              </div>
            </div>
          }
        />
        <p>Damping</p>
        <Slider
          id='damping'
          className='slider'
          min={MIN_DAMPING}
          max={MAX_DAMPING}
          defaultValue={DFLT_DAMPING}
          value={this.state.damping}
          onChange={this.newDampingValue}
          step={1}
          label={
            <div style={styles.labelStyleOuter}>
              <div style={styles.labelStyleInner}>
                {this.state.damping}
              </div>
            </div>
          }
        />
      </div>

		<div id="presets">
		</div>
   	</div>
   	</MuiThemeProvider>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateValues: (stiffness, damping) => {
    dispatch(motionAction(stiffness, damping));
  },
});

export default connect(null, mapDispatchToProps)(Control)
