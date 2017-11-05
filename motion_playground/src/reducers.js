import { combineReducers } from 'redux'

import {
  VALUES_CHANGED
} from './constants/ActionTypes.js'

const initialState = {
  stiffness: 1.0,
  damping: 1.0,
}

function newMotion(state = initialState, action) {
  switch (action.type) {
    case VALUES_CHANGED:
      return {
        ...state,
        stiffness: action.payload.stiffness,
        damping: action.payload.damping,
      }
    default:
      return state
  }
}

const motionApp = combineReducers({
  newMotion
})

export default motionApp
