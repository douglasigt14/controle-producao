import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { View, Text, Alert, ToastAndroid,Modal } from "react-native";
import Bola from "./Bola";
import GrupoButoes from "./GrupoButoes";
import ParadasFrequentes from "./ParadasFrequentes";
import { Appbar ,Button } from "react-native-paper";
import Padrao from '../style/Padrao';
import AwesomeAlert from 'react-native-awesome-alerts';
import { storageSet, consulta_storage } from "../storage/localstorage";
import AsyncStorage from "@react-native-community/async-storage";
import Relogio from "./Relogio";
import { Toast } from "native-base";
import { Cam } from "./Cam";
import { Bar } from "./Bar";
import Pdf from "react-native-pdf";

const ViewModalPdf = styled.View`
     width: 95%;
     min-height: 120px;
     display: flex;
     background-color: #d3d3d3;
  `;

  const Div_Fechar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 0px;
`;

const TouchModal = styled.TouchableHighlight`
    margin-top: 10px;
  `;

  const TextoModal = styled.Text`
  font-size: 25px;
`;

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
    let [cod_plano, setCod_plano] = useState("");
    let [id_controle, setId_controle] = useState(null); 
    let operador_id = props.operador_id;
    let [showAlert2, setShowAlert2] = useState(false);
    let [componentSair, setComponentSair] = useState(null);
    let [componentPdf, setComponentPdf] = useState(null);
    let url = props.url;
    let [token, setToken] = useState("");
    let [inicio, setInicio] = useState("");
    let [resumo_apontamento, setResumo_apontamento] = useState(" ");
    let [ids_ofs, setIds_ofs] = useState([]);
    let [cod_centro, setCod_centro] = useState("");
    let [id_maquina, setId_maquina] = useState("");
    let [modalVisible, setModalVisible] = useState(false);

     const showToast = (msg) => {
       ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
     };

    

    
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
    buscar_storage("@cod_plano", setCod_plano, "");
    buscar_storage("@id_controle", setId_controle, null);
    buscar_storage("@token", setToken, "");
    buscar_storage("@inicio", setInicio, "");
    buscar_storage("@ids_ofs", setIds_ofs, {});
    buscar_storage("@cod_centro", setCod_centro, "");
    buscar_storage("@id_maquina", setId_maquina, "");
    //consulta_storage();
  }, []);

  useEffect(() => {  
  }, [ofs_selecionadas]);

     useEffect(() => {    
        fetch(
         url+"/paradas-frequencia/" +
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

         if(finalizado){
           setComponentSair((<Appbar.Action
             icon="arrow-right-box"
             size={60}
             style={{ width: 100 }}
             onPress={() => {
               setShowAlert2(true);
             }}
           />)); 
         }
         else{
           setComponentSair(null);
         }


         if(finalizado){
          setComponentPdf((<Appbar.Action
            icon="file-pdf"
            size={60}
            style={{ width: 100 }}
            onPress={() => {
              setModalVisible(true);
            }}
          />)); 
        }
        else{
          setComponentPdf(null);
        }

     }, [finalizado, parada_id]);

    
     

     const update_parada = () => {
       let URL_PARADA = url+"/paradas-diarias";
        //--------UPDATE PARADA---------

        let formDataU = new FormData();
       formDataU.append("operador_id", operador_id);
        formDataU.append("_method", "put");

        let prom_update = fetch(URL_PARADA, {
          method: 'POST',
          body: formDataU
        }).then(function (response) {

        }).catch(function (error) {
          showToast("FALHA NA CONEXÃO");
        });

        return prom_update;
      }

      const update_operacao = () => {
        let URL_OPERACAO = url+"/operacoes-diarias";
        //--------UPDATE PARADA---------

        let formDataU = new FormData();
        formDataU.append("operador_id", operador_id);
        formDataU.append("_method", "put");

        let prom_update = fetch(URL_OPERACAO, {
          method: 'POST',
          body: formDataU
        }).then(function (response) {

        }).catch(function (error) {
          showToast("FALHA NA CONEXÃO");
        });

        return prom_update;

      }

    const parar = (rotulo, descricao,parada_id) =>{
       
      let prom_update_parada = update_parada();
       let prom_update_operacao= update_operacao();


      Promise.all([prom_update_parada, prom_update_operacao]).then(valores => {
        // setToch("none");
        let URL_PARADA = url+"/paradas-diarias";
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
          // setToch('auto');
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

          showToast("PARADA INICIADA COM SUCESSO");
        }).catch(function (error) {
           showToast("FALHA NA CONEXÃO");
        });
        //--------INSERE PARADA---------
      });
      
      
    } 

  
    
    const operar = (descricao, qtde) => {
      
      let prom_update_parada = update_parada();
      let prom_update_operacao = update_operacao();

      Promise.all([prom_update_parada, prom_update_operacao]).then(valores => {
                // setToch("none");
                const URL_OPERACAO = url +"/operacoes-diarias";
                const formDataI = new FormData();
                formDataI.append("operador_id", operador_id);
                formDataI.append("cod_item", descricao + "| QTDE: ( "+qtde+" ) | "+cod_plano);
                formDataI.append("posto_id", props.id_posto);
                formDataI.append("tempo_decisao", "0");

                //--------INSERE PARADA---------
                fetch(URL_OPERACAO, {
                  method: "post",
                  body: formDataI
                }).then(function (response) {
                // setToch('auto');

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

                showToast("OPERAÇÃO INICIADA COM SUCESSO");

                }).catch(function (error) {
                  showToast("FALHA NA CONEXÃO");
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
        setCod_plano('');
        
        storageSet("@cor", '#d3d3d3');
        storageSet("@parada_id", '');
        storageSet("@status_texto", 'INICIAR');
        storageSet("@cor_texto", 'black');
        storageSet("@descricao", '');
        storageSet("@finalizado", "true");
        storageSet("@cod_plano", "");
        storageSet("@ofs_selecionadas", JSON.stringify({}));
        storageSet("@ids_ofs", JSON.stringify({}));

      }).catch(function (error) {
        showToast("FALHA NA CONEXÃO");
      });
    } 
    

  const alterar_of = (ofs_marcadas_p,cod_plano,cod_item) => {
    setOfs_selecionadas(ofs_marcadas_p)
    setCod_plano(cod_plano);
    abrir_controle_diario(cod_item, JSON.parse(ofs_marcadas_p));
    let novaHora = new Date();
    let hora = novaHora.getHours();
    let minuto = novaHora.getMinutes();
    let segundo = novaHora.getSeconds();
    hora = zero(hora);
    minuto = zero(minuto);
    segundo = zero(segundo);
    
    storageSet("@inicio", hora+':'+minuto+':'+segundo);
    setInicio(hora + ':' + minuto + ':' + segundo);
    

  }

  function zero(x) {
    if (x < 10) {
      x = '0' + x;
    } return x;
  }

  const abrir_controle_diario = (cod_item, ofs_marcadas_p) => {
    
    let ids_ofs_temp = [];
    let ofs_temp = ofs_marcadas_p;
    ofs_temp.forEach((item) => {
      const formDataOF = new FormData();
      formDataOF.append("num_ordem", item.num_ordem);
      formDataOF.append("data", item.dt_inicial);
      formDataOF.append("item", item.cod_item + " - " + item.item);
      formDataOF.append("mascara", item.mascara);
      formDataOF.append("qtde_pend", item.qtde_pend);
      formDataOF.append("qtde_prod", item.qtde_prod);
      formDataOF.append("em_andamento", true);
      formDataOF.append("motivo_qtde_inferior", null);
      formDataOF.append("operador_id", props.operador_id);
      formDataOF.append("posto_id", props.id_posto);

      const URL_CONTROLE = url + "/ofs";

      fetch(URL_CONTROLE, {
        method: "post",
        body: formDataOF,
      })
        .then(function (resp) {
          return resp.json();
        })
        .then(function (r) {
          item.id_of = r;
          ids_ofs_temp.push(r);
        })
        .catch(function (error) {
          showToast("FALHA NA CONEXÃO");
        });
    });

    setTimeout(() => {
        setIds_ofs(ids_ofs_temp);
        storageSet("@ids_ofs", JSON.stringify(ids_ofs_temp));
        setOfs_selecionadas(JSON.stringify(ofs_temp));
        storageSet("@ofs_selecionadas", JSON.stringify(ofs_temp)); 
       showToast("ITEM SELECIONADO COM SUCESSO");
    }, 3000);
   
    
    const formDataL = new FormData();
    formDataL.append("operador_id", props.operador_id);
    formDataL.append("posto_id", props.id_posto);
    formDataL.append("cod_item", cod_item);
    formDataL.append("status", 1);

    const URL_CONTROLE = url + "/controles-diarios";

    fetch(URL_CONTROLE, {
      method: "post",
      body: formDataL,
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (r) {
        storageSet("@id_controle", JSON.stringify(r.id));
        setId_controle(r.id);
      })
      .catch(function (error) {
        showToast("FALHA NA CONEXÃO");
      });
  };

  const focco_logar = () => {
    let urlFocco = url + "/focco/login";
  let prom =   fetch(urlFocco, {
      method: "get",
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (r) {
         storageSet("@token", r.Token);
      });

      return prom;
  }

    const apontamento = (qtde, cod_barra, qtde_pend, motivo,item) => {
      let novaHora = new Date();
      let hora = novaHora.getHours();
      let minuto = novaHora.getMinutes();
      let segundo = novaHora.getSeconds();
      hora = zero(hora);
      minuto = zero(minuto);
      segundo = zero(segundo);
      

      const formDataL = new FormData();
      formDataL.append("token", token);
      formDataL.append("inicio", inicio);
      formDataL.append("qtde", qtde);
      formDataL.append("qtde_pend", qtde_pend);
      formDataL.append("cod_barra", cod_barra);
      formDataL.append("operador", props.operador_desc);
      formDataL.append("id_maquina", id_maquina);
      formDataL.append("motivo", motivo);
      formDataL.append("fim", hora + ":" + minuto + ":" + segundo);

      const URL_CONTROLE = url + "/focco/incluir_apontamento_tempo_padrao";

      let prom_apontamento = fetch(URL_CONTROLE, {
        method: "post",
        body: formDataL,
      })
        .then(function (resp) {
          return resp.json();
        })
        .then(function (r) {
          let result = r.Succeeded ? "OK" : "ERROR :";
          let msg = result + " " + r.ErrorMessage;
          showToast(msg);

          // Update OF
            const formDataOF = new FormData();
            formDataOF.append("num_ordem", item.num_ordem);
            formDataOF.append("data", item.dt_inicial);
            formDataOF.append("item", item.cod_item + " - " + item.item);
            formDataOF.append("mascara", item.mascara);
            formDataOF.append("qtde_pend", item.qtde_pend);
            formDataOF.append("qtde_prod", item.qtde_prod);
            formDataOF.append("id", item.id_of);
            formDataOF.append("em_andamento", false);
            formDataOF.append("motivo_qtde_inferior", item.motivo);
            formDataOF.append("msg_apontamento", msg);
            formDataOF.append("_method", "put");

            const URL_CONTROLE = url + "/ofs";

            fetch(URL_CONTROLE, {
              method: "post",
              body: formDataOF,
            })
              .then(function (resp) {
                return resp.text();
              })
              .then(function (r) {})
              .catch(function (error) {
                showToast("FALHA NA CONEXÃO FOCCO");
              });
            // Update OF

        })
        .catch(function (error) {
          showToast("FALHA NA CONEXÃO");
        });

        return prom_apontamento;
    };

  const fechar_controle_diario = (qtde,retrabalho,ofs,motivo) => {
          const formDataL = new FormData();
          formDataL.append("_method", 'put');
          formDataL.append("volume_produzido", qtde);
          formDataL.append("retrabalho", retrabalho);
          formDataL.append("id", id_controle); 
          const URL_CONTROLE = url+"/controles-diarios";
          //--------INSERE OPERACAO---------
         let prom_login_focco = focco_logar();

         Promise.all([prom_login_focco]).then((valores) => {

         let prom_fechar_controle = fetch(URL_CONTROLE, {
            method: "post",
            body: formDataL
          }).then(function (resp) {

            return resp.json();

          })
          .then(function (r) {
            
          }).catch(function (error) {
            showToast("FALHA NA CONEXÃO");
          });


           Promise.all([prom_fechar_controle]).then((valores) => {
                   let ofs_selecionadas_temp = ofs;
                   let proms_apontamentos = [];
                   let prom_for = ofs_selecionadas_temp.forEach((item) => {
                     // Update OF
                     const formDataOF = new FormData();
                     formDataOF.append("num_ordem", item.num_ordem);
                     formDataOF.append("data", item.dt_inicial);
                     formDataOF.append(
                       "item",
                       item.cod_item + " - " + item.item
                     );
                     formDataOF.append("mascara", item.mascara);
                     formDataOF.append("qtde_pend", item.qtde_pend);
                     formDataOF.append("qtde_prod", item.qtde_prod);
                     formDataOF.append("id", item.id_of);
                     formDataOF.append("em_andamento", false);
                     formDataOF.append("motivo_qtde_inferior", item.motivo);
                     formDataOF.append("_method", "patch");

                     const URL_CONTROLE = url + "/ofs";

                     fetch(URL_CONTROLE, {
                       method: "post",
                       body: formDataOF,
                     })
                       .then(function (resp) {
                         return resp.text();
                       })
                       .then(function (r) {})
                       .catch(function (error) {
                         showToast("FALHA NA CONEXÃO");
                       });
                     // Update OF

                     if (parseInt(item.qtde_prod) != 0) {
                         apontamento(
                           item.qtde_prod,
                           item.cod_barra,
                           item.qtde_pend,
                           item.motivo,
                           item
                         );
                     }
                   });
                     
           }); //Prom Fechar

           
          });//Prom LOgin Focco

          
  }
   
    return (
      <>
        <View>
          <Appbar.Header style={Padrao.barra}>
            <Appbar.Content 
              title="Controle de Produção"
              titleStyle={{fontSize: 25}} 
            />
            {componentPdf}
            {componentSair}
          </Appbar.Header>
          <GrupoButoes
            finalizado={finalizado}
            funcao_finalizar={finalizar}
            funcao_fechar_controle_diario={fechar_controle_diario}
            operador_id={operador_id}
            id_posto={props.id_posto}
            parada_id={parada_id}
            url={props.url}
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
            descricao={descricao}
            url={props.url}
          ></ParadasFrequentes>
         
          <Bola
            cor={cor}
            cor_texto={cor_texto}
            status_texto={status_texto}
            descricao={descricao}
            funcao_operar={operar}
            funcao_parar={parar}
            id_posto={props.id_posto}
            cod_centro={cod_centro}
            id_maquina={id_maquina}
            ofs_selecionadas={
              ofs_selecionadas
            }
            funcao_alterar_of={alterar_of}
            url={props.url}
          ></Bola>
          <Relogio></Relogio>
        </View>
        

        <AwesomeAlert
          show={mostrar_alert}
          showProgress={false}
          title={descricao_alert}
          message={descricao}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          cancelText="No, cancel"
          contentStyle={{ width: 400, height: 200 }}
          titleStyle={{ fontSize: 25, textAlign: "center" }}
          messageStyle={{ fontSize: 15 }}
        />


        <AwesomeAlert
          show={showAlert2}
          showProgress={false}
          title="Tem certeza que deseja sair?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Não"
          confirmText="Sim"
          cancelButtonColor='#dc3545'
          confirmButtonColor="#28a745"
          onCancelPressed={() => {
            setShowAlert2(false);
          }}
          onConfirmPressed={() => {
            setShowAlert2(false);
            props.funcao_deslogar();
          }}
          contentStyle={{ width: 500, height: 200 }}
          titleStyle={{ fontSize: 25, textAlign: "center" }}
          cancelButtonTextStyle={{ fontSize: 35, textAlign: "center" }}
          confirmButtonTextStyle={{ fontSize: 35, textAlign: "center" }}
          cancelButtonStyle={{ width: 250 }}
          confirmButtonStyle={{ width: 250 }}
        />

         {/* Modais*/}

      {/* Modal Selecionar */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Padrao.topView}>
          <ViewModalPdf style={Padrao.modalView}>
            <Div_Fechar>
              <TouchModal
                style={{ ...Padrao.closeButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <TextoModal style={Padrao.textStyle}>X</TextoModal>
              </TouchModal>
            </Div_Fechar>
            
          </ViewModalPdf>
        </View>
      </Modal>
      {/* Modal Selecionar */}

      </>
    );
};
