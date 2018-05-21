import React, { PureComponent } from 'react';
import { Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

import { styles } from './styles';

class Input extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onTextChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    keyboardType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
    error: PropTypes.bool,
  };

  static defaultProps = {
    keyboardType: undefined,
    autoCapitalize: undefined,
    onSubmitEditing: undefined,
    error: false,
  };

  input = React.createRef();

  focus() {
    this.input.current.focus();
  }

  render() {
    const { label, error } = this.props;

    return <View style={styles.container}>
      <View>
        <Text>{label}</Text>
      </View>
      <TextInput {...this.props} style={styles.input} ref={this.input} />
      <View>
        {error && <Text style={styles.error}>{error}</Text> }
      </View>
    </View>
  }
}

export default Input
