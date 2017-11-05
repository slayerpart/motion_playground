import React, { Component } from 'react';
import { connect } from 'react-redux';
import {spring, TransitionMotion} from 'react-motion';
import './MotionTest.css';

const slice = {
  key: 'x',
  style: {
    y: 15,
    height: 40,
    width: 30,
    angle: 0,
  },
};

class MotionTest extends Component {
  // the constant, non-animated properties
  static defaultProps = {
    x: 45,
    width: 25,
  };

  constructor() {
    super();
    this.state = {
      slices: [slice],
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

  // an instance method for click handling
  // to show how the slice transitions when y and height change
  changeValue() {
    if (this.state.slices.length) {
      const r1 = Math.abs(Math.floor(Math.random() * 40));
      const r2 = Math.abs(Math.floor(Math.random() * 30));
      const randomAngle = Math.abs(Math.floor(Math.random() * 360));

      this.setState({
        slices: [Object.assign({}, slice, {
          style: {
            y: (45 - r1) / 2,
            height: r1,
            width: r2,
            angle: randomAngle
          },
        })]
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
                damping: this.props.damping
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
                      <stop className="stop1" offset="0%"/>
                      <stop className="stop2" offset="100%"/>
                    </linearGradient>
                  </defs>,
                  <rect
                    id="rect1"
                    key={key}
                    x={this.props.x}
                    y={style.y}
                    rx={2}
                    ry={2}
                    width={style.width}
                    height={style.height}
                    style={{
                      transform: `rotate(${style.angle})`
                    }}
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

const mapStateToProps = ({ newMotion: { stiffness, damping }}) => ({
  stiffness,
  damping
})

export default connect(mapStateToProps)(MotionTest);
