
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


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
        const { 
          id, name, value, 
          placeholder, 
          onChange, 
          className } = this.props;

        return (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={name}
              label={placeholder}
              id={id}
              type={showPassword ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              className={className}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      aria-label="toggle password visibility"
                      onClick={this.onToggleShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
        )
    }
}

export default PasswordField