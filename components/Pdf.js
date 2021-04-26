import * as React from 'react';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
  render() {
    return <WebView source={{ uri: 'https://drive.google.com/file/d/1KLrRfLWb5j8D7I4k8msmu9XKkTrNAzM_/view?usp=sharing' }} style={{ marginTop: 20 }} />;
  }
}