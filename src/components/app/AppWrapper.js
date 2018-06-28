import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { breakpoints } from '../../utils/responseHelpers';
import { setActiveBreakpoint } from 'store/actions';

class AppWrapper extends Component {

    static propTypes = {
      children: PropTypes.element,
      dispatch: PropTypes.func
    }

    mediaState = [];

    componentDidMount() {
      Object.keys(breakpoints).forEach(key => {
        const query = window.matchMedia(`(max-width: ${breakpoints[key]}px)`);
        query.breakpoint = breakpoints[key];
        query.name = key;

        const breakpointChange = () => {
          this.dispatchActiveQuery();
        };

        query.addListener(breakpointChange.bind(this));
        this.mediaState.push(query);
      });
      this.dispatchActiveQuery();
    }
    dispatchActiveQuery() {
      const { dispatch } = this.props;
      const activeQuery = this.mediaQueryState.reduce((prev, curr) => {
        return curr.matches ? curr : prev && prev.matches ? prev : null;
      });
      const breakpointName = activeQuery ? activeQuery.name : 'default';
      const breakpointSize = activeQuery && activeQuery.breakpoint;

      dispatch(setActiveBreakpoint(breakpointName, breakpointSize));
    }


    render() {
      const { children } = this.props;

      return (
        <div>
          { children }
        </div>
      );
    }
}

export default connect()(AppWrapper);