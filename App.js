import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, SafeAreaView, Button, Alert } from "react-native";
import Padrao from './style/Padrao';
import Botao from "./components/Botao";
import { Appbar } from "react-native-paper";

export default function App() {
  return (
    <SafeAreaView style={Padrao.container}>
      <Appbar.Header style={Padrao.barra}>
        <Appbar.Content title="Controle de Produção" />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => Alert.alert("Simple Button pressed")}
        />
      </Appbar.Header>
      <Botao texto="Click Aqui" cor='#fff' />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
