
import React, { useState } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import Padrao from "../style/Padrao";




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


  const ViewModalSelecionar = styled.View`
      width: 450px;
      height: 380px;
      display: flex;
  `;


const ViewModalParadas = styled.View`
  width: 80%;
  height: 80%;
  display: flex;
`;

  const TouchModal = styled.TouchableHighlight`
    margin-top: 10px;
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

  const msg = (texto) => {
    Alert.alert(texto);
  } 
   const [modalVisible, setModalVisible] = useState(false);
   const [modalParadasVisible, setModalParadasVisible] = useState(false);

  return (
    <>
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
            <ScrollView></ScrollView>
            <TouchModal
              style={{ ...Padrao.openButton, backgroundColor: "gray" }}
              onPress={() => {
                setModalParadasVisible(!modalParadasVisible);
              }}
            >
              <TextoModal style={Padrao.textStyle}>Fechar</TextoModal>
            </TouchModal>
          </ViewModalParadas>
        </View>
      </Modal>
      {/* Modal Paradas */}

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
    </>
  );
};
