import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  margin: 12,
  radioButton: {
    marginBottom: 16,
  },
};

class Control extends Component {

  constructor() {
    super();
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
    	<Slider id='stiffness' defaultValue={1} />
    	<Slider id='damping' defaultValue={1} />
		<h1>Control Area</h1>
		<div id="presets">
		</div>
   	</div>
   	</MuiThemeProvider>
    )
  }
}

export default Control;