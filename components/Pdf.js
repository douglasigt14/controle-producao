import { Text } from "native-base";
import React, { useState, useEffect, forceUpdate } from "react";
import { WebView } from 'react-native-webview';
import {View} from "react-native";
// import { Appbar } from "react-native-paper";
//  import Padrao from '../style/Padrao';

export default (props) => {
    let [url, setUrl] = useState(props.url);
    let [cod_plano, setCod_plano] = useState(props.cod_plano);
    return (
        <View style={{flex:1}}>
                <WebView  source={{ uri: 'http://168.190.30.239:93/pdfs/'+cod_plano+'.pdf' }} style={{ marginTop: 20,flex: 1 }} />
            </View>
    );
}