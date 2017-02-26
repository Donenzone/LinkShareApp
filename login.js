import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: '', url: ''};
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
  }
  onTextFieldChange(text, type) {
    var new_state = {}
    new_state[type] = text
    this.setState(new_state)
  }
  loginUser() {
    alert('Login!')
  }
  render() {
    return (
        <View style={{marginTop: 100}}>
          <Text style={{fontSize: 15}}>Sign in to continue...</Text>
          <GenericTextField id="url" placeholder="LinkShare URL" onChangeText={this.onTextFieldChange} />
          <GenericTextField id="username" placeholder="Username" onChangeText={this.onTextFieldChange} />
          <GenericTextField id="password" placeholder="Password" secureTextEntry={true} onChangeText={this.onTextFieldChange} />
          <Button title="Sign in" onPress={() => this.loginUser()} />
        </View>
    )
  }
}

export class GenericTextField extends Component {
  constructor(props) {
    super(props)
    this.state = {textInput: ''}
  }
  render() {
    return (
        <TextInput  editable={true}
                    style={{marginTop:80, height: 40}}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry}
                    maxLength={100}
                    value={this.state.username}
                    onChangeText={(text) => this.props.onChangeText(text, this.props.id)}/>
    )
  }
}
GenericTextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
}
