import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Padrao from './style/Padrao';
import Principal from "./components/Principal";
import Login from "./components/Login";
import ParadasFrequentesNew from "./components/ParadasFrequentesNew";
import { storageGetMaquina, storageSetMaquina } from "./storage/localstorage";

export default function App() {
  let logado = true;
  // storageSetMaquina(2);
 
  return (
    <View style={Padrao.container}>
      {
        logado == true
          ? <Principal></Principal>
          : <Login> </Login>
      }
      <StatusBar style="auto" />
    </View>
  );
}
