import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, SafeAreaView, Button, Alert } from "react-native";
import Padrao from './style/Padrao.js';
import Botao from "./components/Botao.js";

export default function App() {
  return (
    <SafeAreaView style={Padrao.container}>
      <Botao></Botao>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
