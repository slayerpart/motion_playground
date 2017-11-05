import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motionAction } from './actions/MotionActions.js';
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

  render() {
    return (
   	<MuiThemeProvider>
    <div id="control">
      <h1 id="control-head">Control Area</h1>
   		<RadioButtonGroup id="control-radio" name="presets" defaultSelected="not_light">
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
        <Slider id='stiffness' defaultValue={1} onChange={this.newStiffnessValue}/>
        <Slider id='damping' defaultValue={1} onChange={this.newDampingValue}/>
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
