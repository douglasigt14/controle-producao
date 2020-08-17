import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Padrao from './style/Padrao';
import Principal from "./components/Principal";
import Login from "./components/Login";
import SelecionarPosto from "./components/SelecionarPosto";
import { storageSet, consulta_storage } from "./storage/localstorage";
import AsyncStorage from "@react-native-community/async-storage";


export default  function App() {
   const selecionar_posto = (id_postoP) => {
     setId_posto(id_postoP);
     storageSet("@id_posto", JSON.stringify(id_postoP));
   };
  let comp_rederizado = null;

  const [id_posto, setId_posto] = useState(null);
  const [logado, setLogado] = useState("0");

 
  
    useEffect(() => {
      const buscar_storage = async (key, set) => {
        try {
          let value = await AsyncStorage.getItem(key);
          value != null ? set(value) : set(null);
        } catch (e) {
          // read error
        }
      };
      buscar_storage("@id_posto", setId_posto);
      buscar_storage("@logado", setLogado);
    }, []);

    //


  const logar = (login,senha) => {
    if(login, senha) {
    const formDataL = new FormData();
    
    formDataL.append("usuario", login);
    formDataL.append("senha", senha);
    formDataL.append("posto_id", id_posto);

    const URL_LOGIN = "http://controleproducao.tuboarte.com/login";
    //--------INSERE OPERACAO---------
    let prom_login = fetch(URL_LOGIN, {
      method: "post",
      body: formDataL,
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (r) {
        if (r.mensagem.tipo == "sucesso") {
            storageSet('@logado',"1");
            setLogado(true);
        } else if (r.mensagem.tipo == "erro") {
          storageSet("@logado", "0");
          setLogado(false);
        }
      });
      }
   
  };

  const deslogar = () => {
      storageSet("@logado", "0");
      setLogado(false);
  }

  if (!id_posto) {
    comp_rederizado = (
      <SelecionarPosto funcao_selecionar={selecionar_posto}></SelecionarPosto>
    );
  } else if (logado == "0" || logado == false) {
           comp_rederizado = (
             <Login id_posto={id_posto} funcao_logar={logar}></Login>
           );
         } else {
           comp_rederizado = (
             <Principal
               id_posto={id_posto}
               funcao_deslogar={deslogar}
             ></Principal>
           );
         }

  return (
    <>
      <View style={Padrao.container}>
        {comp_rederizado}
        <StatusBar style="auto" />
      </View>
    </>
  );
}
