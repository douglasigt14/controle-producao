
import React, { useState } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
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
      width: 400px;
      height: 300px;
      display: flex;
  `;

  const TouchModal = styled.TouchableHighlight`
    margin-top: 10px;
  `;
  

  const Texto = styled.Text`
    font-size: 40px;
    color: ${props.cor_texto};
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

  return (
    <>
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
                props.funcao_operar();
              }}
            >
              <Text style={Padrao.textStyle}>Operar</Text>
            </TouchModal>

            <TouchModal
              style={{ ...Padrao.openButton, backgroundColor: "#dc3545" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={Padrao.textStyle}>Selecionar Parada</Text>
            </TouchModal>

            <TouchModal
              style={{ ...Padrao.openButton, backgroundColor: "gray" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={Padrao.textStyle}>Cancelar</Text>
            </TouchModal>
          </ViewModalSelecionar>
        </View>
      </Modal>

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
