
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
} from "react-native";
import Padrao from "../style/Padrao";
import { Button, Card } from "react-native-paper";
import Accordion from "./Accordion";




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
      height: 380px;
      display: flex;
  `;


const ViewModalParadas = styled.View`
  width: 100%;
  height: 90%;
  display: flex;
`;

  const TouchModal = styled.TouchableHighlight`
    margin-top: 10px;
  `;
  

  const TextoParadas = styled.Text`
    font-size: 18px;
  `;

  const Texto = styled.Text`
    font-size: 40px;
    color: ${props.cor_texto};
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

  const msg = (texto) => {
    Alert.alert(texto);
  } 
   let [modalVisible, setModalVisible] = useState(false);
   let [modalParadasVisible, setModalParadasVisible] = useState(false);

    let [isLoading, setLoading] = useState(true);
    let [paradas, setParadas] = useState([]);
    let [id_posto, setId_posto] = useState(props.id_posto);

     useEffect(() => {
       fetch(
         "http://controleproducao.tuboarte.com/paradas/codigos_restrito/" +
           id_posto
       )
         .then((response) => response.json())
         .then((json) => setParadas(json))
         .catch((error) => console.error(error))
         .finally(() => setLoading(false));
     }, []);

  return (
    <>
      <View>
        <Accordion></Accordion>
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={Padrao.centeredView}>
          <ViewModalSelecionar style={Padrao.modalView}>
            <TouchModal
              style={{ ...Padrao.openButton, backgroundColor: "#28a745" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                props.funcao_operar("ITEM DESCRIÇÃO");
              }}
            >
              <TextoModal style={Padrao.textStyle}>Operar</TextoModal>
            </TouchModal>

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

            <TouchModal
              style={{ ...Padrao.openButton, backgroundColor: "gray" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <TextoModal style={Padrao.textStyle}>Fechar</TextoModal>
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
          Alert.alert("Modal has been closed.");
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
                LisHeaderComponent={
                  <TouchModal
                    style={{ ...Padrao.openButton, backgroundColor: "gray" }}
                    onPress={() => {
                      setModalParadasVisible(!modalParadasVisible);
                    }}
                  >
                    <TextoModal style={Padrao.textStyle}>Fechar</TextoModal>
                  </TouchModal>
                }
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
    </>
  );
};
