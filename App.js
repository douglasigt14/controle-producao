import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Padrao from './style/Padrao';
import Principal from "./components/Principal";
import Login from "./components/Login";
import SelecionarPosto from "./components/SelecionarPosto";
import { storageSet, consulta_storage } from "./storage/localstorage";
import AsyncStorage from "@react-native-community/async-storage";
import AwesomeAlert from 'react-native-awesome-alerts';

export default  function App() {
    let [id_posto, setId_posto] = useState(null);
    let [logado, setLogado] = useState("0");
    let [operador_id, setOperador_id] = useState(null);
    let [operador_desc, setOperador_desc] = useState(null);
    let [mostrar_alert, setMostrar_alert] = useState(false);
    let [descricao_alert_tit, setDescricao_alert_tit] = useState("");
    let [descricao_alert_sub, setDescricao_alert_sub] = useState("");
    let url = "http://teste.controleproducao.tuboarte.com";

    const showAlert = () => {
      setMostrar_alert(true);
    };

    const hideAlert = () => {
      setMostrar_alert(false);
    };

    useEffect(() => {
      const buscar_storage = async (key, set, inicial) => {
        try {
          let value = await AsyncStorage.getItem(key);
          value != null ? set(value) : set(inicial);
        } catch (e) {
          // read error
        }
      };
      buscar_storage("@id_posto", setId_posto, null);
      buscar_storage("@logado", setLogado, "0");
      buscar_storage("@operador_id", setOperador_id, null);
      buscar_storage("@operador_desc", setOperador_desc, null);

    }, []);

  const selecionar_posto = (id_postoP) => {
    if(id_postoP){
      setId_posto(id_postoP);
      storageSet("@id_posto", String(id_postoP));
    }
  };

  let comp_rederizado = null;

  const logar = (login,senha) => {
    if(login, senha) {
      const formDataL = new FormData();
      
      formDataL.append("usuario", login);
      formDataL.append("senha", senha);
      formDataL.append("posto_id", id_posto);

      const URL_LOGIN = url+"/login";
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
              focco_logar();

              storageSet('@logado',"1");
              setLogado("1");

              storageSet("@operador_id", String(r.user_id));
              setOperador_id( String(r.user_id) );

              storageSet("@operador_desc", r.rotulo);
              setOperador_desc(r.rotulo);

              setDescricao_alert_tit('Login feito com sucesso');
            setDescricao_alert_sub('Iniciando aplicação');

          } else if (r.mensagem.tipo == "erro") {
           
            storageSet("@logado", "0");
            setLogado("0");

            storageSet("@operador_id", "");
            setOperador_id("");

            storageSet("@operador_desc", "");
            setOperador_desc("");

            setDescricao_alert_tit('(!) Login Incorreto');
            setDescricao_alert_sub('Digite Novamente');
          }

          showAlert();
          setTimeout(function () { hideAlert(); }, 500);
        });
      }
   
  };

  const focco_logar = () => {
    let urlFocco = url + "/focco/login";
    fetch(urlFocco, {
      method: "get",
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (r) {
         storageSet("@token", r.Token);
      });
  }
  
  
  const deslogar = () => {
      storageSet("@logado", "0");
      setLogado("0");

      storageSet("@operador_id", "");
      setOperador_id("");

      storageSet("@operador_desc", "");
      setOperador_desc("");
  }

  

  if (!id_posto) {
    comp_rederizado = (
      <SelecionarPosto funcao_selecionar={selecionar_posto} url={url}></SelecionarPosto>
    );
  } else if (logado == "0" || logado == null) {
    comp_rederizado = (
      <Login id_posto={id_posto} funcao_logar={logar} url={url}></Login>
    );
  } else {
    comp_rederizado = (
      <Principal
        id_posto={id_posto}
        operador_id={operador_id}
        operador_desc={operador_desc}
        funcao_deslogar={deslogar}
        url={url}
      ></Principal>
    );
  }

  return (
    <>
      <View style={Padrao.container}>
        {comp_rederizado}
        <StatusBar style="auto" />
      </View>

      <AwesomeAlert
        show={mostrar_alert}
        showProgress={false}
        title={descricao_alert_tit}
        message={descricao_alert_sub}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        cancelText="No, cancel"
        contentStyle={{ width: 400, height: 200 }}
        titleStyle={{ fontSize: 25, textAlign: 'center' }}
        messageStyle={{ fontSize: 15 }}
      />
    </>
  );
}
