import React, {useState} from "react";
import { Alert, View, Text, StyleSheet, Modal } from "react-native";
import styled from "styled-components";
import { Button, Card } from 'react-native-paper';
import Padrao from "../style/Padrao";

const Texto = styled.Text`
    font-size: 18px;
  `;

const Div = styled.View`
    display: flex;    
    flex-direction: row;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
    justify-content: space-around;
`;

const Div_Card = styled.View`
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
    justify-content: space-around;
`;

const ViewModalSelecionar = styled.View`
      width: 450px;
      height: 380px;
      display: flex;
  `;

const TouchModal = styled.TouchableHighlight`
    margin-top: 10px;
  `;

const TextoModal = styled.Text`
    font-size: 25px;
  `;

export default (props) => {
  const [msg, setMsg] = useState('Douglas');
  const [modalVisible, setModalVisible] = useState(false);
   let finalizado = props.finalizado;
  return (
    <>
    
      <Div_Card>
      <Card>
        <Card.Content>
            <Div>
              <Div>
                <Button contentStyle={{ height: 90 }} title='Paradas' color="#dc3545" title='Paradas' mode="contained" 
                onPress={() => {
                  setModalVisible(true);
                }}>
                  <Texto>Paradas</Texto>
                </Button>
              </Div>
              <Div>
                <Button contentStyle={{ height: 90 }} color="#28a745" title='Operações' mode="contained" onPress={() => console.log('Pressed')}>
                  <Texto>Operações </Texto>
                </Button>
              </Div>
              <Div>
                <Button contentStyle={{ height: 90 }} color="#007bff" title='C. Diarios' mode="contained" onPress={() => console.log('Pressed')}>
                  <Texto>C. Diarios </Texto>
                </Button>
              </Div>
              <Div>
                <Button contentStyle={{ height: 90 }} color="#ffc107" title='T. de Paradas' mode="contained" onPress={() => console.log('Pressed')}>
                  <Texto>T. de Paradas</Texto>
                </Button>
              </Div>
              {finalizado == false ? (
                <Div>
                  <Button contentStyle={{ height: 90 }} color="#6c757d" title='Finalizar' mode="contained" onPress={() => {
                    props.funcao_finalizar(props.id_posto)
                  }}>
                    <Texto>Finalizar</Texto>
                  </Button>
                </Div>
              ) : (
                  <Div>
                    <Button contentStyle={{ height: 90 }} color="#6c757d" title='Finalizar' mode="contained" disabled='true' onPress={() => console.log('Pressed')}>
                      <Texto>Finalizar</Texto>
                    </Button>
                  </Div>
                )}
            </Div>
        </Card.Content>
        
      </Card>
      </Div_Card>



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
    </>
  );
};
