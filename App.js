import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View } from "react-native";
import Padrao from './style/Padrao';
import Principal from "./components/Principal";
import Login from "./components/Login";
import SelecionarPosto from "./components/SelecionarPosto";

export default  function App() {
  const [id_posto, setId_posto] = useState(null);
  const [logado, setLogado] = useState(false);
  let comp_rederizado = null;

  const selecionar_posto = (id_postoP) => {
    setId_posto(id_postoP);
  };

  const logar = (login,senha) => {
    const formDataL = new FormData();
    
    formDataL.append("usuario", login);
    formDataL.append("senha", senha);
    formDataL.append("posto_id", id_posto);

    const URL_LOGIN = "http://controleproducao.tuboarte.com/login";
    //--------INSERE OPERACAO---------
    prom_login = fetch(URL_LOGIN, {
      method: "post",
      body: formDataL,
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (r) {
        if (r.mensagem.tipo == "sucesso") {
            setLogado(true);
        } else if (r.mensagem.tipo == "erro") {
          setLogado(false);
        }
      });
   
  };

  const deslogar = () => {
      setLogado(false);
  }

  if (!id_posto) {
    comp_rederizado = (
      <SelecionarPosto funcao_selecionar={selecionar_posto}></SelecionarPosto>
    );
  } else if (logado == false) {
    comp_rederizado = (
      <Login id_posto={id_posto} funcao_logar={logar}></Login>
    );
  } else {
    comp_rederizado = (
      <Principal id_posto={id_posto} funcao_deslogar={deslogar}></Principal>
    );
  }

  return (
    <View style={Padrao.container}>
      {comp_rederizado}
      <StatusBar style="auto" />
    </View>
  );
}
