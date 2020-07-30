import React from 'react';
import {Button, Alert } from "react-native";
import Padrao from '../style/Padrao.js';

export default (props) => {
  return (
    <Button
      onPress={() => Alert.alert("Simple Button pressed")}
      title={props.texto}
      color={props.cor}
      accessibilityLabel="Learn more about this purple button"
    />
  );
}
