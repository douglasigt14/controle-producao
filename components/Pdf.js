import * as React from 'react';
import { WebView } from 'react-native-webview';
// import {
//     View
//   } from "react-native";
// import { Appbar } from "react-native-paper";
//  import Padrao from '../style/Padrao';

export default (props) => {
    return (<>
                <WebView source={{ uri: props.url }} style={{ marginTop: 20 }} />
            </>);
}