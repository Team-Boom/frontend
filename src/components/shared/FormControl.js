import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FormControl extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.any,
    hide: PropTypes.bool,
  };

  render() {
    const { label, children, hide } = this.props;

    return (
      <div>
        { label && <label className={hide ? 'hide' : null}>{label}:</label> }
        <div className="control">
          {children}
        </div>
      </div>
    );
  }
}

export default FormControl;