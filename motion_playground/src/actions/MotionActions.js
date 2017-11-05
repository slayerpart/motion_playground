import { VALUES_CHANGED } from '../constants/ActionTypes.js';

export const motionAction = (stiffness, damping, precision) => (
  { type: VALUES_CHANGED, payload: { stiffness, damping, precision } });
