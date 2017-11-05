import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { connect } from 'react-redux';
import { motionAction } from './actions/MotionActions.js';

const styles = {
  margin: 12,
  radioButton: {
    marginBottom: 16,
  },
};

class Control extends Component {

  state = {
  	stiffness: 1.0,
  	damping: 1.0,
  };

  constructor() {
    super();
  }

  newStiffnessValue = (event, value) => {
  	console.log("stiffness:", value);
  	this.setState({stiffness: value});
  	this.valuesToStore();
  };

  newDampingValue = (event, value) => {
  	console.log("damping:", value);
  	this.setState({damping: value});
  	this.valuesToStore();
  }

  valuesToStore = () => {
  	console.log(this.props);
  	// this.props.updateValues(
  	// 	this.state.stiffness, 
  	// 	this.state.damping
  	// );
  }

  render() {
    return (
   	<MuiThemeProvider>
    <div id="control">
    	<RaisedButton label="Primary" primary={true} style={styles} />
   		<RadioButtonGroup name="presets" defaultSelected="not_light">
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
    	<Slider id='stiffness' name='stiffness' defaultValue={1} onChange={this.newStiffnessValue}/>
    	<Slider id='damping'  name='damping' defaultValue={1} onChange={this.newDampingValue}/>
		<h1>Control Area</h1>
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

//export default connect(null, mapDispatchToProps)(Control)
export default Control;