import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View } from "react-native";
import Padrao from './style/Padrao';
import Principal from "./components/Principal";
import Login from "./components/Login";
import SelecionarPosto from "./components/SelecionarPosto";
import ParadasFrequentesNew from "./components/ParadasFrequentesNew";
import { storageGetMaquina, storageSetMaquina } from "./storage/localstorage";

export default function App() {
  const p = storageGetMaquina();
  console.log(p);

  const [id_posto, setId_posto] = useState("2");
  const [logado, setLogado] = useState(false);
  const [selecionar_posto, setSelecionar_posto] = useState(false);
  let comp_rederizado = null;

  if (selecionar_posto == false) {
    comp_rederizado = <SelecionarPosto></SelecionarPosto>;
  }
  else if (logado == false) {
    comp_rederizado = <Login id_posto={id_posto}> </Login>;
  }
  else {
    comp_rederizado = <Principal id_posto={id_posto}></Principal>;
  }

  return (
    <View style={Padrao.container}>
      {comp_rederizado}
      <StatusBar style="auto" />
    </View>
  );
}
