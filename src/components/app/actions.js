


export function setActiveBreakpoint(breakpointName, breakpointSize) {
  return ({
    type: 'SET_ACTIVE_BREAKPOINT', breakpointName, breakpointSize
  });
}