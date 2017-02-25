import React, { Component } from 'react';
import { WebView } from 'react-native';

export class SharedItemWebView extends Component {
  render() {
    return (
      <WebView
        source={{uri: this.props.uri}}
        style={{marginTop: 60}}
      />
    );
  }
}
