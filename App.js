import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from "react-native";
import Padrao from './style/Padrao';
import Principal from "./components/Principal";
import Login from "./components/Login";


export default function App() {
  let logado = true;
  return (
    <View style={Padrao.container}>
      {
        logado == true
          ? <Principal cor='green' cor_texto='white' status_texto='OPERANDO' ></Principal>
          : <Login> </Login>
      }
      <StatusBar style="auto" />
    </View>
  );
}
