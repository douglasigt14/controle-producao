import React from 'react';
import {Button, Alert, View } from "react-native";
import Padrao from '../style/Padrao';

export default (props) => {
  return (
    <View style={Padrao.view}>
      <Button
        onPress={() => Alert.alert("Simple Button pressed")}
        title={props.texto}
        accessibilityLabel="Learn more about this purple button"
        color={props.cor}
      />
    </View>
  );
}
