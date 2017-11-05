import React, { Component } from 'react';
import {spring, TransitionMotion} from 'react-motion';

const slice = {
  key: 'x',
  style: {
    y: 15,
    height: 70,
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
    this.exitOrReenter = this.exitOrReenter.bind(this);
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
      const random = Math.floor(Math.random() * 70);
      this.setState({
        slices: [Object.assign({}, slice, {
          style: {
            y: (100 - random) / 2,
            height: random,
          },
        })]
      });
    }
  }

  // an instance method for click handling
  // to simulate the slice being removed then re-added to the dataset
  exitOrReenter() {
    if (this.state.slices.length === 0) {
      this.setState({
        slices: [slice],
      });
    } else {
      this.setState({
        slices: [],
      });
    }
  }

  // content is essentially identical to defaultStyles
  // but this handles the *re*entry of the slice (after it has exited)
  willEnter() {
    return {
      y: 50,
      height: 0,
    };
  }

  // this is where we define how the slice exits
  // note than unlike willEnter, you use spring() here!
  willLeave() {
    return {
      y: spring(50),
      height: spring(0)
    };
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
                y: 50,
                height: 0,
              },
            }]}
            styles={this.state.slices.map((slice) => {
              const { style } = slice;
              return {
                key: slice.key,
                style: {
                  y: spring(style.y),
                  height: spring(style.height),
                },
              };
            })}
            willEnter={this.willEnter}
            willLeave={this.willLeave}
          >
            {(slices) => {
              if (slices.length === 0) {
                return null;
              }
              const { key, style } = slices[0];
              return (
                <rect
                  key={key}
                  x={this.props.x}
                  y={style.y}
                  rx={2}
                  ry={2}
                  width={this.props.width}
                  height={style.height}
                />
              );
            }}
          </TransitionMotion>
        </svg>
      </div>
    )
  }
}

export default MotionTest;
