import { combineReducers } from 'redux'

import {
  DFLT_STIFFINESS,
  DFLT_DAMPING,
} from './constants/motion.js'

import {
  VALUES_CHANGED
} from './constants/ActionTypes.js'

const initialState = {
  stiffness: DFLT_STIFFINESS,
  damping: DFLT_DAMPING,
}

function newMotion(state = initialState, action) {
  switch (action.type) {
    case VALUES_CHANGED:
      return [
          {
            stiffness: action.stiffness,
            damping: action.damping,
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