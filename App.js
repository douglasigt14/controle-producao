import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { View, Text, RefreshControl, ScrollView } from "react-native";
import Padrao from './style/Padrao';
import Principal from "./components/Principal";
import Login from "./components/Login";
import SelecionarPosto from "./components/SelecionarPosto";
import SelecionarLink from "./components/SelecionarLink";
import { storageSet, consulta_storage } from "./storage/localstorage";
import AsyncStorage from "@react-native-community/async-storage";
import AwesomeAlert from 'react-native-awesome-alerts';
import Leitor_Bar from "./components/Bar";
import Pdf from "./components/Pdf";

export default  function App() {
    let [id_posto, setId_posto] = useState(null);
    let [logado, setLogado] = useState("0");
    let [pdf, setPdf] = useState("1");
    let [operador_id, setOperador_id] = useState(null);
    let [operador_desc, setOperador_desc] = useState(null);
    let [mostrar_alert, setMostrar_alert] = useState(false);
    let [descricao_alert_tit, setDescricao_alert_tit] = useState("");
    let [descricao_alert_sub, setDescricao_alert_sub] = useState("");
    let [modo_leitura, setModo_leitura] = useState(false);
    let [url, setUrl] = useState(null);
   
    const wait = (timeout) => {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    };

   const [refreshing, setRefreshing] = React.useState(false);

   const onRefresh = React.useCallback(() => {
     setRefreshing(true);

     wait(2000).then(() => setRefreshing(false));
   }, []);


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
      buscar_storage("@url", setUrl, null);
    }, []);
  
   const selecionar_link = (value) => {
      let url_temp = value == 1 ? "http://teste.controleproducao.tuboarte.com" : "http://pro.controleproducao.tuboarte.com";

      setUrl(url_temp);
      storageSet("@url", url_temp);
   }
  const selecionar_posto = (value) => {
    if(value){
      
      let partes = value.split("-");
      setId_posto(partes[0]);
      storageSet("@id_posto", String(partes[0]));

      storageSet("@cod_centro", String(partes[1]));
      storageSet("@id_maquina", String(partes[2]));
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


  const mudar_pdf = () => {
    console.warn("mudar_pdf");
  }

  if (!url) {
    comp_rederizado = (
      <SelecionarLink funcao_selecionar={selecionar_link}></SelecionarLink>
    );
  }
  else if (!id_posto) {
    comp_rederizado = (
      <SelecionarPosto funcao_selecionar={selecionar_posto} url={url}></SelecionarPosto>
    );
  } else if (logado == "0" || logado == null) {
    comp_rederizado = (
      <Login id_posto={id_posto} funcao_logar={logar} url={url}></Login>
    );
  } 
  else {
    comp_rederizado = (
      <Principal
        id_posto={id_posto}
        operador_id={operador_id}
        operador_desc={operador_desc}
        funcao_deslogar={deslogar}
        funcao_pdf={mudar_pdf}
        url={url}
      ></Principal>
    );
  }

  return (
    <>
       <View style={Padrao.container}
        refreshControl={
                   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
        }>
         {comp_rederizado} 
        {/* <Pdf url={'https://drive.google.com/file/d/1KLrRfLWb5j8D7I4k8msmu9XKkTrNAzM_/view?usp=sharing'}></Pdf> */}
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
        titleStyle={{ fontSize: 25, textAlign: "center" }}
        messageStyle={{ fontSize: 15 }}
      />
    </>
  );
}
