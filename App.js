import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from "react-native";
import Padrao from './style/Padrao';
import Principal from "./components/Principal";
import Login from "./components/Login";


export default function App() {
  let logado = true;
  let cor = 'red';
  let status_texto = 'PARADO';
  let descricao = 'P - 01 MANUTENÇÃO MECANICA';
  return (
    <View style={Padrao.container}>
      {
        logado == true
          ? <Principal cor={cor} cor_texto='white' status_texto={status_texto} descricao={descricao} ></Principal>
          : <Login> </Login>
      }
      <StatusBar style="auto" />
    </View>
  );
}
