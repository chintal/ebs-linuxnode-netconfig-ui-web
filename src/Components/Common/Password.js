
import React, {Component} from 'react';
import { Form, Icon, Input } from 'semantic-ui-react';


class PasswordField extends Component{
    state = {
        showPassword: false,
    }

    onToggleShowPassword = () =>
      this.setState(prevState => ({
          showPassword: !prevState.showPassword,
      }));

    render() {
        const { showPassword } = this.state;
        const { value, placeholder, onChange, className } = this.props;

        return (
            <Form.Input 
              fluid 
              iconPosition="right"
              placeholder={placeholder}
              className={className} 
              type={showPassword ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              icon={
                  <Icon
                    name={showPassword ? 'eye slash' : 'eye'}
                    link
                    onClick={this.onToggleShowPassword}
                  />
              }
            />
        )
    }
}

export default PasswordField