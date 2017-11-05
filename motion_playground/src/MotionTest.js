import React, { Component } from 'react';
import { connect } from 'react-redux';
import {spring, TransitionMotion} from 'react-motion';
import './MotionTest.css';

const initialSlice = {
  key: 'x',
  style: {
    y: 15,
    height: 40,
    width: 30,
    angle: 0,
  },
};

class MotionTest extends Component {
  static defaultProps = {
    x: 45,
    width: 25,
  };

  constructor() {
    super();
    this.state = {
      slices: [initialSlice],
      intervalId: 0
    }
    this.changeValue = this.changeValue.bind(this);
  }

  componentDidMount() {
    this.setState({
      intervalId: setInterval(this.changeValue, 2000)
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  changeValue() {
    if (this.state.slices.length) {
      const randNum1 = Math.max(Math.abs(Math.floor(Math.random() * 50)), 10);
      const randNum2 = Math.max(Math.abs(Math.floor(Math.random() * 40)), 10);
      const randAngle = Math.abs(Math.floor(Math.random() * 360));

      this.setState({
        slices: [{ ...slice,
          style: {
            height: randNum1,
            width: randNum2,
            angle: randAngle
          },
        }]
      });
    }
  }

  render() {
    return (
      <div id="motion">
        <svg viewBox="0 0 100 100">
          <TransitionMotion
            // responsible for the animation on first load!
            defaultStyles={[{
              key: slice.key,
              style: {
                y: 30,
                height: 0,
                width: 0,
                angle: 0
              },
            }]}
            styles={this.state.slices.map((slice) => {
              const { style } = slice;
              const springOptions = {
                stiffness: this.props.stiffness,
                damping: this.props.damping,
                precision: this.props.precision
              };

              return {
                key: slice.key,
                style: {
                  y: spring(style.y, springOptions),
                  height: spring(style.height, springOptions),
                  width: spring(style.width, springOptions),
                  angle: spring(style.angle, springOptions),
                },
              };
            })}
          >
            {(slices) => {
              if (slices.length === 0) {
                return null;
              }
              const { key, style } = slices[0];
              return (
                <g>
                  <defs>
                    <linearGradient gradientTransform={`rotate(${style.angle})`} id="Gradient1">
                      <stop className="stop1" offset="20%"/>
                      <stop className="stop2" offset="80%"/>
                    </linearGradient>
                  </defs>,
                  <rect
                    id="rect1"
                    key={key}
                    x={this.props.x}
                    y={style.height / 2}
                    rx={2}
                    ry={2}
                    width={style.width}
                    height={style.height}
                  />
                </g>
              );
            }}
          </TransitionMotion>
        </svg>
      </div>
    )
  }
}

const mapStateToProps = ({ newMotion: { stiffness, damping, precision }}) => ({
  stiffness,
  damping,
  precision
})

export default connect(mapStateToProps)(MotionTest);
