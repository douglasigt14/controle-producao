import { Text } from "native-base";
import React, { useState, useEffect, forceUpdate } from "react";
import { WebView } from 'react-native-webview';
import {View} from "react-native";
// import { Appbar } from "react-native-paper";
//  import Padrao from '../style/Padrao';

export default (props) => {
    let [url, setUrl] = useState(props.url);
    return (
        <View style={{flex:1}}>
                <WebView source={{ uri: url }} style={{ marginTop: 20,flex: 1 }} />
            </View>
    );
}