import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View , Alert, Text } from "react-native";
import Padrao from './style/Padrao';
import GrupoButoes from "./components/GrupoButoes";
import Principal from "./components/Principal";
import Login from "./components/Login";
import { Appbar } from "react-native-paper";

export default function App() {
  let logado = true
  return (
    <View style={Padrao.container}>
      <Appbar.Header style={Padrao.barra}>
        <Appbar.Content title="Controle de Produção" />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => Alert.alert("Opções")}
        />
      </Appbar.Header>
      {
        logado == true
          ? <Principal cor='green' cor_texto='white' status_texto='OPERANDO' ></Principal>
          : <Login> </Login>
      }
      <StatusBar style="auto" />
    </View>
  );
}
