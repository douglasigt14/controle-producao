import * as React from 'react';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
  render() {
    return <WebView source={{ uri: 'https://drive.google.com/file/d/1Sh249fr0fIR0exRI3rg2XXfqDtEb3hab/view?usp=sharing' }} style={{ marginTop: 20 }} />;
  }
}