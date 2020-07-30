import React from 'react';
import {Button, Alert } from "react-native";
import Padrao from '../style/Padrao.js';

export default function App() {
  return (
    <Button
      onPress={() => Alert.alert("Simple Button pressed")}
      title="Click Aqui"
      color="#000"
      accessibilityLabel="Learn more about this purple button"
      style={Padrao.botao}
    />
  );
}
