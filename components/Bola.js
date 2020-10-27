
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  ScrollView,
  FlatList,
  TextInput,
  ToastAndroid
} from "react-native";
import { CheckBox  } from "native-base";
import Padrao from "../style/Padrao";
import { Button, Card } from "react-native-paper";
import Ofs from "./Ofs";
import { storageSet, consulta_storage } from "../storage/localstorage";


const ViewModalItemInputs = styled.View`
     display: flex;
     flex-direction: row;
     margin: 5px;
     justify-content: space-around;
`;

const Div = styled.View`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 15px;
  justify-content: space-evenly;
`;


const ViewModalSelecionar = styled.View`
      width: 450px;
      min-height: 380px;
      display: flex;
  `;

const ViewModalItem = styled.View`
     width: 95%;
     min-height: 520px;
     display: flex;
   `;


const ViewModalParadas = styled.View`
  width: 95%;
  height: 90%;
  display: flex;
`;

const TouchModal = styled.TouchableHighlight`
    margin-top: 10px;
  `;


const TextoParadas = styled.Text`
    font-size: 18px;
  `;



const TextoModal = styled.Text`
    font-size: 25px;
  `;

const Descricao = styled.Text`
    font-size: 23px;
  `;

const Div_Descricao = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  `;

const Div_Fechar = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 0px;
  `;


export default (props) => {
  
  const Bola = styled.View`
    width: 500px;
    height: 500px;
    margin: 20px auto;
    border-radius: 500px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${props.cor};
  `;

  const Texto = styled.Text`
    font-size: 40px;
    color: ${props.cor_texto};
  `;

   const TextoCores = styled.Text`
    font-size: 30px;
    margin-left: 15px;
  `;

      const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
      };


    const msg = (texto) => {
      Alert.alert(texto);
    } 
    let [modalVisible, setModalVisible] = useState(false);
    let [modalParadasVisible, setModalParadasVisible] = useState(false);
    let [modalItemVisible, setModalItemVisible] = useState(false);
    let [modalCoresVisible, setModalCoresVisible] = useState(false);

    let [isLoading, setLoading] = useState(true);
    let [paradas, setParadas] = useState([]);
    let [id_posto, setId_posto] = useState(props.id_posto);
    let [isOfsSelecionadas, setIsOfsSelecionadas] = useState(false);

    let [cod_item, setCod_item] = useState("");
    let [cod_plano, setCod_plano] = useState("");
  
    let [focus_cod_plano, setFocus_cod_plano] = useState(false);
    let [focus_cod_item, setFocus_cod_item] = useState(false);

     let [editable_cod_plano, setEditable_cod_plano] = useState(true);
     let [editable_cod_item, setEditable_cod_item] = useState(true);

    let [mostrarOf, setMostrarOf] = useState(false);
    let [mostrarAlert, setMostrarAlert] = useState(false);
    let [acoordeon, setAcordeon] = useState(null);
    let [ofs, setOfs] = useState([]);
    
    let [dt_lotes, setDt_lotes] = useState([]);

    let [componentVerde, setComponentVerde] = useState(null); 

    let [cores, setCores] = useState("Selecionar Cor"); 
    let [lista_cores, setLista_cores] = useState([]); 
    
  let ofs_selecionadas = props.ofs_selecionadas;
  let url = props.url;
  let cod_centro = props.cod_centro;
  let id_maquina = props.id_maquina;
    
   let tabela = {
     tableHead: ["OF", "ITEM", "COR", "QTD"],
     tableData: [["1", "2", "3", "4"]],
   };

  const sumir_modalItem = (ofs_marcadas_p) => {
    setModalItemVisible(false);
    storageSet("@cod_plano", cod_plano);

    let ofs_marcadas_j = JSON.parse(ofs_marcadas_p);
    let cod_i = ofs_marcadas_j[0].cod_item || "";
    props.funcao_alterar_of(ofs_marcadas_p,cod_plano,cod_i);
  }  
  const limparOf = () =>{
    setCod_plano("");
    setCod_item("");
    setOfs([]);
    setEditable_cod_item(true);
    setEditable_cod_plano(true);
    setAcordeon(null);
    setMostrarOf(false);
    setMostrarAlert(false);
  }

  const buscarOf = (cod_item,cod_plano) =>{
    cod_item = cod_item ? cod_item : 0; 
    cod_plano = cod_plano ? cod_plano : 0;
    let URL = url + "/itens/" + cod_item + "/" + cod_plano + "/" + cod_centro + "/" + id_maquina;
   // showToast(URL);

    fetch(
      URL
    )
      .then((response) => response.json())
      .then((json) => {
          setOfs(json);
          if (json.length == 0){
            setMostrarOf(false);
            setMostrarAlert(true);
            setEditable_cod_item(true);
            setEditable_cod_plano(true);
          }
          else{
            setMostrarOf(true);
            setMostrarAlert(false);
            setEditable_cod_item(false);
            setEditable_cod_plano(false);
          }

           

          
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
   
  }

  const selecionar_cores = (cod_item) =>{
      setModalCoresVisible(true);
      let lista = [
          {id: 1, cor: 'ALAMO', marcado: true},
          {id: 2, cor: 'AMENDOA', marcado: true},
          {id: 3, cor: 'BRANCO', marcado: true}
      ];
     atulizar_lista_cores(lista);
  }

  const atulizar_lista_cores = (lista) => {
    let lista_cores_temp = lista; 
    lista_cores_temp.forEach(item => {
        item.check = <CheckBox style={{ width: 50, height: 50}} color='black' onPress={() => {
                         marcar_desmarcar(item.id);
                      }} checked={item.marcado} />;
      });
      setLista_cores(lista_cores_temp);
  }

  const marcar_desmarcar = (id) =>{
      let lista_cores_temp2 = lista_cores;
      lista_cores_temp2.forEach(item => {
        if(item.id == id){
           
            item.marcado = !item.marcado;
            item.check = (<CheckBox style={{ width: 50, height: 50}} color='black' onPress={() => {
                         marcar_desmarcar(item.id);
                      }} checked={item.marcado} />);
        }
      });
      atulizar_lista_cores(lista_cores_temp2);
  }

  useEffect(() => {
    //atulizar_lista_cores();
   }, [lista_cores]);

  useEffect(() => {
    if (mostrarOf){
      setAcordeon(<View style={{ paddingTop: 10 }}>
        <Ofs cod_item={cod_item} cod_plano={cod_plano} ofs={ofs} funcao_limparOf={limparOf} funcao_sumir_modalItem={sumir_modalItem}></Ofs>
        </View>);
    }
    else if (mostrarAlert) {
      setAcordeon(
        <View style={{ padding: 20, backgroundColor: '#F8D7D9', borderColor: '#f5c6cb' }}>
          <Text>Nenhuma OF encontrada</Text>
        </View>);
    }
    else{
      setAcordeon(null);
    }  
  }, [mostrarOf, mostrarAlert]);

     useEffect(() => {
       fetch(
         url+"/paradas/codigos_restrito/" +
           id_posto
       )
         .then((response) => response.json())
         .then((json) => setParadas(json))
         .catch((error) => console.error(error))
         .finally(() => setLoading(false));

  
       if (ofs_selecionadas.length > 2 ) {
         let ofs_selecionadas_temp = JSON.parse(ofs_selecionadas);
         let qtde = 0;
         ofs_selecionadas_temp.forEach(item => {
           qtde += parseInt(item.qtde_pend);
         });
         setComponentVerde( (
           <TouchModal
             style={{ ...Padrao.openButton, backgroundColor: "#28a745" }}
             onPress={() => {
               setModalVisible(false);
               props.funcao_operar(ofs_selecionadas_temp[0].cod_item + '-' + ofs_selecionadas_temp[0].item, qtde);
             }}
           >
             <TextoModal style={Padrao.textStyle}>Operar</TextoModal>
           </TouchModal>
         ) );
       } else {
         setComponentVerde( (
           <TouchModal
             style={{ ...Padrao.openButton, backgroundColor: "#28a745" }}
             onPress={() => {
               setModalVisible(false);
               setModalItemVisible(true);
             }}
           >
             <TextoModal style={Padrao.textStyle}>Selecionar Item</TextoModal>
           </TouchModal>
         ) );
       }
     }, [ofs_selecionadas]);

  return (
    <>
      <View>
        <Div_Descricao>
          <Descricao>{props.descricao}</Descricao>
        </Div_Descricao>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Bola>
            <Texto>{props.status_texto}</Texto>
          </Bola>
        </TouchableWithoutFeedback>
      </View>

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
        <View style={Padrao.centeredView}>
          <ViewModalSelecionar style={Padrao.modalView}>
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
            {componentVerde}
            <TouchModal
              style={{ ...Padrao.openButton, backgroundColor: "#dc3545" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setModalParadasVisible(true);
              }}
            >
              <TextoModal style={Padrao.textStyle}>
                Selecionar Parada
              </TextoModal>
            </TouchModal>
          </ViewModalSelecionar>
        </View>
      </Modal>
      {/* Modal Selecionar */}

      {/* Modal Paradas */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalParadasVisible}
        onRequestClose={() => {
          setModalParadasVisible(!modalParadasVisible);
        }}
      >
        <View style={Padrao.centeredView}>
          <ViewModalParadas style={Padrao.modalView}>
            <Div_Fechar>
              <TouchModal
                style={{ ...Padrao.closeButton }}
                onPress={() => {
                  setModalParadasVisible(!modalParadasVisible);
                }}
              >
                <TextoModal style={Padrao.textStyle}>X</TextoModal>
              </TouchModal>
            </Div_Fechar>
            <ScrollView>
              <FlatList
                LisHeaderComponent={<></>}
                style={Padrao.FlatList}
                numColumns={3}
                data={paradas}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <Div>
                    <Button
                      contentStyle={{ height: 90, width: 180 }}
                      color="#ffc107"
                      mode="contained"
                      onPress={() => {
                        props.funcao_parar(
                          item.rotulo,
                          item.descricao,
                          item.id
                        );
                        setModalParadasVisible(!modalParadasVisible);
                      }}
                    >
                      <TextoParadas>{item.rotulo} </TextoParadas>
                    </Button>
                  </Div>
                )}
                ListFooterComponent={<></>}
              />
            </ScrollView>
          </ViewModalParadas>
        </View>
      </Modal>
      {/* Modal Paradas */}

      {/* Modal Item */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalItemVisible}
        onRequestClose={() => {
          setModalItemVisible(!modalItemVisible);
        }}
      >
        <View style={Padrao.topView}>
          <ViewModalItem style={Padrao.modalView}>
            <Div_Fechar>
              <TouchModal
                style={{ ...Padrao.closeButton }}
                onPress={() => {
                  setModalItemVisible(!modalItemVisible);
                }}
              >
                <TextoModal style={Padrao.textStyle}>X</TextoModal>
              </TouchModal>
            </Div_Fechar>
            <View>
              <Text>COD PEÇA</Text>
              <TextInput
                style={[Padrao.inputModal]}
                value={cod_item}
                editable={editable_cod_item}
                onChangeText={(text) => {
                  setCod_item(text);
                }}
                keyboardType={"phone-pad"}
              />
            </View>
            {cod_centro == "60" ? ( 
              <View>
                <Text>COD PLANO (COLOCAR TODOS OS ZEROS)</Text>
                <TextInput
                  style={[Padrao.inputModal]}
                  value={cod_plano}
                  editable={editable_cod_plano}
                  onChangeText={(text) => {
                    setCod_plano(text);
                  }}
                  keyboardType={"phone-pad"}
                />
              </View>
            ) : null}
            {cod_centro == "50" ? ( 
              <View>
                <TouchModal
                  disabled={!editable_cod_item || !cod_item}
                  style={{ ...Padrao.openButton, backgroundColor: "#007bff" }}
                  onPress={() => {
                    selecionar_cores(cod_item);
                  }}
                >
                  <TextoModal style={Padrao.textStyle}>{cores}</TextoModal>
                </TouchModal>
              </View>
            ) : null}
            <TouchModal
              disabled={!editable_cod_item}
              style={{ ...Padrao.openButton, backgroundColor: "gray" }}
              onPress={() => {
                buscarOf(cod_item, cod_plano);
              }}
            >
              <TextoModal style={Padrao.textStyle}>Buscar</TextoModal>
            </TouchModal>
            {acoordeon}
          </ViewModalItem>
        </View>
      </Modal>
      {/* Modal Item */}


      {/* Modal Cores */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalCoresVisible}
        onRequestClose={() => {
          setModalCoresVisible(false);
        }}
      >
        <View style={Padrao.topView}>
          <ViewModalItem style={Padrao.modalView}>
            <Div_Fechar>
              <TouchModal
                style={{ ...Padrao.closeButton }}
                onPress={() => {
                  setModalCoresVisible(false);
                }}
              >
                <TextoModal style={Padrao.textStyle}>X</TextoModal>
              </TouchModal>
            </Div_Fechar>
            <ScrollView>
              <FlatList
                LisHeaderComponent={<></>}
                data={lista_cores}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <View style={{flexDirection: 'row', margin: 10}}>
                      {item.check}
                      <TextoCores>{item.cor}</TextoCores>
                      
                    </View>
                )}
                ListFooterComponent={<></>}
              />
            </ScrollView>
          </ViewModalItem>
        </View>
      </Modal>
      {/* Modal Cores*/}
    </>
  );
};
