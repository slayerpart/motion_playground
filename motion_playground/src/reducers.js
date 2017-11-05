import { combineReducers } from 'redux'

import {
  VALUES_CHANGED
} from './actions/MotionActions.js'

const initialState = {
  stiffness: 1.0,
  dampness: 1.0,
}

function newMotion(state = initialState, action) {
  switch (action.type) {
    case VALUES_CHANGED:
      return [
          ...state,
          {
            stiffness: action.stiffness,
            dampness: action.dampness,
          }
      ]
    default:
      return state
  }
}

const motionApp = combineReducers({
  newMotion
})

export default motionApp