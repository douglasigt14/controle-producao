import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { View, Text, Alert } from "react-native";
import Bola from "./Bola";
import GrupoButoes from "./GrupoButoes";
import ParadasFrequentes from "./ParadasFrequentes";
import { Appbar ,Button } from "react-native-paper";
import Padrao from '../style/Padrao';
import AwesomeAlert from 'react-native-awesome-alerts';
import { storageSet, consulta_storage } from "../storage/localstorage";
import AsyncStorage from "@react-native-community/async-storage";

export default (props) => {

    let [isLoading, setLoading] = useState(true);
    let [cor, setCor] = useState('#d3d3d3');
    let [status_texto, setStatus_texto] = useState("INICIAR");
    let [descricao, setDescricao] = useState("");
    let [descricao_alert, setDescricao_alert] = useState("");
    let [parada_id, setParada_id] = useState(null); 
    let [cor_texto, setCor_texto] = useState("black");
    let [finalizado, setFinalizado] = useState(true);
    let [paradasFrequentes, setParadasFrequentes] = useState([]);
    let [mostrar_alert, setMostrar_alert] = useState(false);
    let [ofs_selecionadas, setOfs_selecionadas] = useState([]);
    let [toch, setToch] = useState('auto');
    let operador_id = props.operador_id;

    
  const showAlert = () => {
    setMostrar_alert(true);
    };

  const hideAlert = () => {
    setMostrar_alert(false);
  };

  useEffect(() => {
    const buscar_storage = async (key, set,inicial) => {
      try {
        let value = await AsyncStorage.getItem(key);
        value = value == "true" ? true : value;
        value = value == "false" ? false : value;
        value != null ? set(value) : set(inicial);
      } catch (e) {
        // read error
      }
    };
    buscar_storage("@cor", setCor, '#d3d3d3');
    buscar_storage("@parada_id", setParada_id, null);
    buscar_storage("@status_texto", setStatus_texto, "INICIAR");
    buscar_storage("@cor_texto", setCor_texto, "black");
    buscar_storage("@descricao", setDescricao, "");
    buscar_storage("@finalizado", setFinalizado, "true");
    buscar_storage("@ofs_selecionadas", setOfs_selecionadas, {});

    //consulta_storage();
  }, []);

  useEffect(() => {  
    //console.warn('Teste Efeito');
  }, [ofs_selecionadas]);

     useEffect(() => {    
        fetch(
         "http://controleproducao.tuboarte.com/paradas-frequencia/" +
           props.id_posto
          )
         .then((response) => response.json())
         .then((json) => {
           json.forEach((dados) => {
              (parada_id == dados.id )
                ? (dados.habilitado = true)
                : (dados.habilitado = false);
           });
           setParadasFrequentes(json);
         })
         .catch((error) => console.error(error))
         .finally(() => setLoading(false));


     }, [finalizado, parada_id]);

    
     

     const update_parada = () => {
        let URL_PARADA = "http://controleproducao.tuboarte.com/paradas-diarias";
        //--------UPDATE PARADA---------

        let formDataU = new FormData();
       formDataU.append("operador_id", operador_id);
        formDataU.append("_method", "put");

        let prom_update = fetch(URL_PARADA, {
          method: 'POST',
          body: formDataU
        }).then(function (response) {

        });

        return prom_update;
      }

      const update_operacao = () => {
        let URL_OPERACAO = "http://controleproducao.tuboarte.com/operacoes-diarias";
        //--------UPDATE PARADA---------

        let formDataU = new FormData();
        formDataU.append("operador_id", operador_id);
        formDataU.append("_method", "put");

        let prom_update = fetch(URL_OPERACAO, {
          method: 'POST',
          body: formDataU
        }).then(function (response) {

        });

        return prom_update;

      }

    const parar = (rotulo, descricao,parada_id) =>{
       
      let prom_update_parada = update_parada();
       let prom_update_operacao= update_operacao();


      Promise.all([prom_update_parada, prom_update_operacao]).then(valores => {
        setToch("none");
        let URL_PARADA = "http://controleproducao.tuboarte.com/paradas-diarias";
        const formDataI = new FormData();
        formDataI.append("operador_id", operador_id);
        formDataI.append("cod_id", parada_id);
        formDataI.append("posto_id", props.id_posto);
        formDataI.append("tempo_decisao", "0");

        //--------INSERE PARADA---------
        fetch(URL_PARADA, {
          method: "post",
          body: formDataI
        }).then(function (response) {
          setToch('auto');
            cor = parada_id == 18 ? "#f6c23e" : "red";
          setCor(cor);
          setParada_id(JSON.stringify(parada_id));
          setStatus_texto('PARADO');
          setCor_texto('white');
          setDescricao(rotulo + ' ' + descricao);   
          setFinalizado(false);

          storageSet("@cor", cor);
          storageSet("@parada_id", JSON.stringify(parada_id));
          storageSet("@status_texto", 'PARADO');
          storageSet("@cor_texto", 'white');
          storageSet("@descricao", rotulo + ' ' + descricao);
          storageSet("@finalizado", "false");
          
          setDescricao_alert('PARADA INICIADA COM SUCESSO');
          showAlert();
          setTimeout(function () { hideAlert(); }, 500); //setToch('auto');
        });
        //--------INSERE PARADA---------
      });
      
      
    } 
    
    const operar = (descricao, qtde) => {
      
      let prom_update_parada = update_parada();
      let prom_update_operacao = update_operacao();

      Promise.all([prom_update_parada, prom_update_operacao]).then(valores => {
                setToch("none");
                const URL_OPERACAO = "http://controleproducao.tuboarte.com/operacoes-diarias";
                const formDataI = new FormData();
                formDataI.append("operador_id", operador_id);
                formDataI.append("cod_item", descricao + "| QTDE: ( "+qtde+" ) | 0002");
                formDataI.append("posto_id", props.id_posto);
                formDataI.append("tempo_decisao", "0");

                //--------INSERE PARADA---------
                fetch(URL_OPERACAO, {
                  method: "post",
                  body: formDataI
                }).then(function (response) {
                setToch('auto');

                setCor('green');
                setStatus_texto('OPERANDO');
                setCor_texto('white');
                setParada_id(null);
                setDescricao(descricao);
                
               
                setFinalizado(false);

                storageSet("@cor", 'green');
                storageSet("@parada_id", '');
                storageSet("@status_texto", 'OPERANDO');
                storageSet("@cor_texto", 'white');
                storageSet("@descricao", descricao);
                storageSet("@finalizado", "false");

                setDescricao_alert('OPERAÇÃO INICIADA COM SUCESSO');
                showAlert();
                setTimeout(function () { hideAlert(); }, 500);
        });
      });
    } 

    
    const finalizar = () => {
      let prom_update_parada = update_parada();
      let prom_update_operacao = update_operacao();
      
      Promise.all([prom_update_parada, prom_update_operacao]).then(valores => {
        setCor('#d3d3d3');
        setStatus_texto('INICIAR');
        setCor_texto('black');
        setDescricao('');
        setParada_id(null);
        
        setFinalizado(true);
        setOfs_selecionadas({});
        
        storageSet("@cor", '#d3d3d3');
        storageSet("@parada_id", '');
        storageSet("@status_texto", 'INICIAR');
        storageSet("@cor_texto", 'black');
        storageSet("@descricao", '');
        storageSet("@finalizado", "true");
        storageSet("@ofs_selecionadas", JSON.stringify({}));

        setDescricao_alert('FINALIZADO COM SUCESSO');
        showAlert();
        setTimeout(function () { hideAlert(); }, 500);
      });
    } 

  const alterar_of = (ofs_marcadas_p) => {
    setOfs_selecionadas(ofs_marcadas_p)
  }
   
    return (
      <>
        <View pointerEvents={toch}>
          <Appbar.Header style={Padrao.barra}>
            <Appbar.Content title="Controle de Produção" />
            <Appbar.Action
              icon="arrow-right"
              onPress={() => {
                props.funcao_deslogar();
              }}
            />
          </Appbar.Header>
          <GrupoButoes
            finalizado={finalizado}
            funcao_finalizar={finalizar}
            operador_id={operador_id}
            id_posto={props.id_posto}
            ofs_selecionadas={
              ofs_selecionadas
            }
          ></GrupoButoes>
          <ParadasFrequentes
            finalizado={finalizado}
            funcao_finalizar={finalizar}
            id_posto={props.id_posto}
            operador_id={props.operador_id}
            operador_desc={props.operador_desc}
            funcao_parar={parar}
            paradasFrequentes={paradasFrequentes}
          ></ParadasFrequentes>

          <Bola
            cor={cor}
            cor_texto={cor_texto}
            status_texto={status_texto}
            descricao={descricao}
            funcao_operar={operar}
            funcao_parar={parar}
            id_posto={props.id_posto}
            ofs_selecionadas={
              ofs_selecionadas
            }
            funcao_alterar_of={alterar_of}
          ></Bola>
        </View>

        <AwesomeAlert
          show={mostrar_alert}
          showProgress={false}
          title={descricao_alert}
          message={descricao}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          cancelText="No, cancel"
          contentStyle={{ width: 400, height: 200 }}
          titleStyle={{ fontSize: 25, textAlign: "center" }}
          messageStyle={{ fontSize: 15 }}
        />
      </>
    );
};
