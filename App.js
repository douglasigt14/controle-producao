import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View , Alert, Text } from "react-native";
import Padrao from './style/Padrao';
import GrupoButoes from "./components/GrupoButoes";
import Principal from "./components/Principal";
import { Appbar } from "react-native-paper";

export default function App() {
  return (
    <View style={Padrao.container}>
      <Appbar.Header style={Padrao.barra}>
        <Appbar.Content title="Controle de Produção" />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => Alert.alert("Simple Button pressed")}
        />
      </Appbar.Header>
      <Principal cor='green' cor_texto='white' status_texto='OPERANDO' ></Principal>
      <StatusBar style="auto" />
    </View>
  );
}
