import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View } from "react-native";
import Padrao from './style/Padrao';
import Principal from "./components/Principal";
import Login from "./components/Login";
import SelecionarPosto from "./components/SelecionarPosto";
import { storageGetMaquina, storageSetMaquina } from "./storage/localstorage";

export default function App() {
  
  const [id_posto, setId_posto] = useState(null);
  const [logado, setLogado] = useState(false);
  let comp_rederizado = null;

  const selecionar_posto = (id_postoP) => {
    setId_posto(id_postoP);
  };

  const logar = (login,senha) => {
    console.warn(login);
    console.warn(senha);
    setLogado(true);
  };

  if (!id_posto) {
    comp_rederizado = (
      <SelecionarPosto funcao_selecionar={selecionar_posto}></SelecionarPosto>
    );
  } else if (logado == false) {
    comp_rederizado = <Login funcao_logar={logar} id_posto={id_posto}> </Login>;
  } else {
    comp_rederizado = <Principal id_posto={id_posto}></Principal>;
  }

  return (
    <View style={Padrao.container}>
      {comp_rederizado}
      <StatusBar style="auto" />
    </View>
  );
}
