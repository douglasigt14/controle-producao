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
    const [id_posto, setId_posto] = useState(null);
    const [logado, setLogado] = useState("0");
    const [operador_id, setOperador_id] = useState(null);
    const [operador_desc, setOperador_desc] = useState(null);

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

  const selecionar_posto = (id_postoP) => {
    setId_posto(id_postoP);
    storageSet("@id_posto", JSON.stringify(id_postoP));
  };

  let comp_rederizado = null;

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
            setLogado("1");

            storageSet("@operador_id", JSON.stringify(r.user_id));
            setOperador_id(r.user_id);

            storageSet("@operador_desc", r.rotulo);
            setOperador_desc(r.rotulo);

        } else if (r.mensagem.tipo == "erro") {
          storageSet("@logado", "0");
          setLogado("0");

          storageSet("@operador_id", "");
          setOperador_id("");

          storageSet("@operador_desc", "");
          setOperador_desc("");
        }
        consulta_storage();
      });
      }
   
  };

  const deslogar = () => {
      storageSet("@logado", "0");
      setLogado("0");

      storageSet("@operador_id", "");
      setOperador_id("");

      storageSet("@operador_desc", "");
      setOperador_desc("");

       consulta_storage();
  }

  
  // console.warn(logado);

  if (!id_posto) {
    comp_rederizado = (
      <SelecionarPosto funcao_selecionar={selecionar_posto}></SelecionarPosto>
    );
  } else if (logado == "0" || logado == null) {
    comp_rederizado = (
      <Login id_posto={id_posto} funcao_logar={logar}></Login>
    );
  } else {
    comp_rederizado = (
      <Principal
        id_posto={id_posto}
        operador_id={operador_id}
        operador_desc={operador_desc}
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
