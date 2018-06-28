import { SET_ACTIVE_BREAKPOINT } from './reducers';

export function setActiveBreakpoint(breakpointName, breakpointSize) {

  return ({
    type: SET_ACTIVE_BREAKPOINT,
    payload: { breakpointName, breakpointSize }
  });
}