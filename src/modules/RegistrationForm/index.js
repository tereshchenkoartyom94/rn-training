import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { validateEmail, validateName, validatePassword, validatePhone } from '../../utils/validation';
import Input from '../Input';

const PASSWORD_INPUT_PROPS = { secureTextEntry: true, autoCapitalize: false };

class RegistrationForm extends PureComponent {
  state = {
    name: { value: '', error: '' },
    phone: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    repeatPassword: { value: '', error: '' },
  };

  inputs = {};

  onNameChange = name => {
    this.setState({ name: { name: name.value, error: validateName(name) ? false : 'Invalid name' } })
  };

  onPhoneChange = phone => {
    this.setState({ phone: { value: phone.value, error: validatePhone(phone) ? false : 'Invalid phone' } })
  };

  onEmailChange = email => {
    this.setState({ email: { value: email.value, error: validateEmail(email) ? false : 'Invalid email' } })
  };

  onPasswordChange = password => {
    this.setState({
      password: {
        value: password.value,
        error: validatePassword(password) ? false : 'Invalid phone'
      }
    })
  };

  onPasswordRepeatChange = passwordRepeat => {
    this.setState({
      passwordRepeat: {
        value: passwordRepeat.value,
        error: this.validatePasswordRepeat() ? false : 'Password does not match'
      }
    })
  };

  onNameSubmitEditing = () => {
    this.focusField('email');
  };

  onPhoneSubmitEditing = () => {
    this.focusField('password');
  };

  onEmailSubmitEditing = () => {
    this.focusField('phone');
  };

  onPasswordSubmitEditing = () => {
    this.focusField('passwordRepeat');
  };

  validatePasswordRepeat() {
    const { value } = this.state.password;

    return (value && value === this.state.passwordRepeat.value);
  }

  focusField = key => {
    this.inputs[key].focus();
  };

  renderInput(props) {
    return <View>
      <Input {...props} />
    </View>
  }

  render() {
    const {
      name,
      phone,
      email,
      password,
      repeatPassword,
    } = this.state;

    console.log(this.state.name);

    return (
      <ScrollView>
        <View>
          {this.renderInput({
            label: 'Name', autoCorrect: false, ref: input => {
              this.inputs['name'] = input;
            },
            onSubmitEditing: this.onNameSubmitEditing,
            value: name.value,
            error: name.error,
            onChangeText: this.onNameChange,
          })}
          {this.renderInput({
            label: 'Email',
            keyboardType: 'email-address',
            autoCapitalize: false,
            autoCorrect: false,
            ref: input => {
              this.inputs['email'] = input;
            },
            onSubmitEditing: this.onEmailSubmitEditing,
            value: email.value,
            error: email.error,
            onChangeText: this.onEmailChange,
          })}
          {this.renderInput({
            label: 'Phone', keyboardType: 'phone-pad', autoCapitalize: false, ref: input => {
              this.inputs['phone'] = input;
            },
            onSubmitEditing: this.onPhoneSubmitEditing,
            value: phone.value,
            error: phone.error,
            onChangeText: this.onPhoneChange,
          })}
          {this.renderInput({
            label: 'Password', ref: input => {
              this.inputs['password'] = input;
            },
            onSubmitEditing: this.onPasswordSubmitEditing,
            value: password.value,
            error: password.error,
            onChangeText: this.onPasswordChange,
            ...PASSWORD_INPUT_PROPS
          })}
          {this.renderInput({
            label: 'Repeat password', ref: input => {
              this.inputs['passwordRepeat'] = input;
            },
            value: repeatPassword.value,
            error: repeatPassword.error,
            onChangeText: this.onPasswordRepeatChange,
            ...PASSWORD_INPUT_PROPS
          })}
        </View>
      </ScrollView>
    );
  }
}

export default RegistrationForm;
