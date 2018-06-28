import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactDOM } from 'react-router-dom';

class Modal extends Component {

    static propTypes = {
      parent: PropTypes.string.isRequired,
      type: PropTypes.string, //'view' or 'edit'
      component: PropTypes.func.isRequired,
    };

    el = document.createElement('div');
    root =document.getElementById(this.props.parent);

    componentDidMount() {
      this.root.appendChild(this.el);
    }

    componentWillUnmount() {
      this.root.removeChild(this.el);
    }
    render() {
      return ReactDOM.createPortal(
        this.props.component,
        this.el,
      );
    }
}

export default Modal;