import React, { PureComponent } from 'React';
import PropTypes from 'prop-types';
import FormControl from '../shared/FormControl';

export default class Certification extends PureComponent {
    
    static propTypes = {
      submit: PropTypes.func.isRequired,
      action: PropTypes.string.isRequired,
      user: PropTypes.object,
      allowName: PropTypes.bool
    };

    state = {
      name: '',
      email: '',
      password: ''
    };

    handleChange = ({ target }) => {
      this.setState({ [target.name]: target.value });
    };

    handleSubmit = event => {
      event.preventDefault();
      this.props.submit(this.state);
    };

    render() {
      const { action, allowName = false, user } = this.props;
      const { name, email, password } = this.state;

      return (
        <form onSubmit={this.handleSubmit}>
  
          { allowName &&
          <FormControl label="name">
            <input name="name" value={name} onChange={this.handleChange} pattern=".{4,}" required title="Please enter at least 4 characters"/>
          </FormControl> }
          
          <FormControl label="email">
            <input name="email" type="email" value={email} onChange={this.handleChange} required title="Please enter your e-mail address"/>
          </FormControl>

          <FormControl label="password">
            <input name="password" type="password" value={password} onChange={this.handleChange} required title="Please enter your password"/>
          </FormControl>

          <FormControl>
            <button>{action}</button>
          </FormControl>

          { user && user.error &&
          (<div id="auth-errror">
            Error: {user.error}
          </div> )}
        </form>
      );
    }
}