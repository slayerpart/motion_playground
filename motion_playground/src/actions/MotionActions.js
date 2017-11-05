import { VALUES_CHANGED } from '../constants/ActionTypes.js';

export const motionAction = (stiffness, damping) => (
  { type: VALUES_CHANGED, stiffness: stiffness, damping: damping });


