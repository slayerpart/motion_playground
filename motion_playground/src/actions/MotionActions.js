import { VALUES_CHANGED } from '../constants/ActionTypes.js';

export const motionAction = (stiffness, damping) => (
  { type: VALUES_CHANGED, payload: { stiffness, damping } });
